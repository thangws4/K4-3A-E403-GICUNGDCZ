"""Server nhỏ cho demo: phục vụ giao diện prototype và API gọi module quyết định thật.

Chạy:  python codebase/decision/server.py      → mở http://localhost:8000
  GET  /                  giao diện chat demo (codebase/prototype/index.html)
  GET  /eval              trang eval golden set (codebase/prototype/eval.html)
  GET  /demo              trang demo thuyết trình (codebase/prototype/demo.html)
  GET  /api/demo-cases    kịch bản demo + câu trả lời thật của bot hiện tại
  GET  /api/health        provider, model, đã có key chưa
  GET  /api/faq           danh sách FAQ (nguồn chính thức giả lập)
  POST /api/decide        {"text": "..."} → decision + route + reply (gọi LLM thật, có ghi log)
  GET  /api/golden        25 ca trong eval/golden_set.json
  GET  /api/runs          danh sách các lượt đã chạy trong eval/runs/
  GET  /api/runs/<run_id> từng ca của một lượt: log đầy đủ + lý do không đạt
  POST /api/eval-case     {"case_id": "H2-1"} → chạy lại 1 ca bằng LLM thật và chấm (không ghi vào lượt cũ)
"""
from __future__ import annotations

import json
import os
import re
import sys
import threading
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit

sys.path.insert(0, str(Path(__file__).resolve().parent))
import decide as core  # noqa: E402

sys.path.insert(0, str(core.ROOT / "eval"))
import run_eval  # noqa: E402

PROTOTYPE_DIR = core.ROOT / "codebase" / "prototype"
GOLDEN = core.ROOT / "eval" / "golden_set.json"
RUNS_DIR = core.ROOT / "eval" / "runs"
PORT = int(os.environ.get("PORT", "8000"))
# Khi mở link công khai cho người thử (validation R6): tắt /api/eval-case, giới hạn số lời gọi AI.
PUBLIC_MODE = os.environ.get("PUBLIC_MODE") == "1"
MAX_DECIDE_CALLS = int(os.environ.get("MAX_DECIDE_CALLS", "0"))
decide_calls = 0
calls_lock = threading.Lock()


def load_cases() -> list[dict]:
    return json.loads(GOLDEN.read_text(encoding="utf-8"))["cases"]


def read_run(run_id: str) -> list[dict]:
    path = RUNS_DIR / f"{run_id}.jsonl"
    return [json.loads(line) for line in path.read_text(encoding="utf-8").splitlines() if line.strip()]


def list_runs() -> list[dict]:
    cases = {c["id"]: c for c in load_cases()}
    out = []
    for path in sorted(RUNS_DIR.glob("run-*.jsonl"), reverse=True):
        recs = read_run(path.stem)
        scored = [run_eval.score(cases[r["meta"]["case_id"]], r) for r in recs if r["meta"].get("case_id") in cases]
        out.append({"run_id": path.stem, "ts": recs[0]["ts"] if recs else None,
                    "provider": recs[0]["provider"] if recs else None, "model": recs[0]["model"] if recs else None,
                    "n": len(scored), "passed": sum(not f for f in scored)})
    return out


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(PROTOTYPE_DIR), **kwargs)

    def _json(self, obj: dict, status: int = 200) -> None:
        body = json.dumps(obj, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        path = urlsplit(self.path).path  # bỏ ?query và #hash khi định tuyến
        if path == "/api/health":
            key_ok = bool(os.environ.get("GEMINI_API_KEY")) if core.PROVIDER == "gemini" else True
            return self._json({"provider": core.PROVIDER, "model": core.MODEL, "configured": key_ok})
        if path == "/api/faq":
            return self._json({"items": core.FAQ})
        if path == "/api/golden":
            return self._json({"cases": load_cases()})
        if path == "/api/runs":
            return self._json({"runs": list_runs()})
        m = re.fullmatch(r"/api/runs/(run-\d{8}-\d{6})", path)
        if m:
            if not (RUNS_DIR / f"{m.group(1)}.jsonl").exists():
                return self._json({"error": "không có lượt này"}, 404)
            cases = {c["id"]: c for c in load_cases()}
            rows = [{"case_id": r["meta"]["case_id"], "rec": r, "fails": run_eval.score(cases[r["meta"]["case_id"]], r)}
                    for r in read_run(m.group(1)) if r["meta"].get("case_id") in cases]
            return self._json({"run_id": m.group(1), "rows": rows})
        if path == "/api/demo-cases":
            golden = {c["id"]: c for c in load_cases()}
            demo = json.loads((Path(__file__).resolve().parent / "demo_cases.json").read_text(encoding="utf-8"))["cases"]
            return self._json({"cases": [d | {"case": golden[d["case_id"]]} for d in demo if d["case_id"] in golden]})
        if path in ("/eval", "/eval/"):
            self.path = "/eval.html"
        if path in ("/demo", "/demo/"):
            self.path = "/demo.html"
        if path in ("/slides", "/slides/"):
            self.path = "/slides.html"
        return super().do_GET()

    def _body(self) -> dict:
        length = int(self.headers.get("Content-Length", 0))
        return json.loads(self.rfile.read(length) or b"{}")

    def do_POST(self):
        if self.path == "/api/eval-case" and PUBLIC_MODE:
            return self._json({"error": "tắt khi mở link công khai cho người thử"}, 403)
        if self.path == "/api/eval-case":
            try:
                case_id = str(self._body().get("case_id", ""))
            except (ValueError, json.JSONDecodeError):
                return self._json({"error": "body phải là JSON {\"case_id\": ...}"}, 400)
            case = next((c for c in load_cases() if c["id"] == case_id), None)
            if not case:
                return self._json({"error": f"không có ca {case_id}"}, 404)
            rec = core.decide(case["input"], meta={"source": "eval-ui", "case_id": case_id})
            return self._json({"case_id": case_id, "rec": rec, "fails": run_eval.score(case, rec)})
        if self.path != "/api/decide":
            return self._json({"error": "not found"}, 404)
        try:
            body = self._body()
            text = str(body.get("text", "")).strip()[:500 if PUBLIC_MODE else 2000]
            tester = str(body.get("tester", ""))
        except (ValueError, json.JSONDecodeError):
            return self._json({"error": "body phải là JSON {\"text\": ...}"}, 400)
        if not text:
            return self._json({"error": "thiếu text"}, 400)
        global decide_calls
        with calls_lock:
            if MAX_DECIDE_CALLS and decide_calls >= MAX_DECIDE_CALLS:
                return self._json({"error": "Buổi thử đã dùng hết số lượt gọi AI cho hôm nay. Cảm ơn bạn!"}, 429)
            decide_calls += 1
        meta = {"source": "tester" if re.fullmatch(r"U\d{1,2}", tester) else "demo-ui"}
        if meta["source"] == "tester":
            meta["tester"] = tester
        rec = core.decide(text, meta=meta)
        faq = core.FAQ_BY_ID.get((rec["decision"] or {}).get("faq_id"))
        self._json({k: rec[k] for k in ("log_id", "ts", "provider", "model", "decision", "route", "reply", "error", "latency_ms", "raw_response")} | {"faq": faq})


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    print(f"Provider: {core.PROVIDER} · model: {core.MODEL}")
    if PUBLIC_MODE:
        print(f"PUBLIC_MODE: tắt /api/eval-case · giới hạn {MAX_DECIDE_CALLS or 'không giới hạn'} lời gọi AI")
    print(f"Demo: http://localhost:{PORT}/demo  ·  Chat: http://localhost:{PORT}  ·  Eval: http://localhost:{PORT}/eval  (Ctrl+C để dừng)")
    ThreadingHTTPServer(("127.0.0.1", PORT), Handler).serve_forever()
