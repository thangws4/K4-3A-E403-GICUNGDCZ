"""Server nhỏ cho demo: phục vụ giao diện prototype và API gọi module quyết định thật.

Chạy:  python codebase/decision/server.py      → mở http://localhost:8000
  GET  /              giao diện codebase/prototype/index.html
  GET  /api/health    provider, model, đã có key chưa
  GET  /api/faq       danh sách FAQ (nguồn chính thức giả lập)
  POST /api/decide    {"text": "..."} → decision + route + reply (gọi LLM thật, có ghi log)
"""
from __future__ import annotations

import json
import os
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import decide as core  # noqa: E402

PROTOTYPE_DIR = core.ROOT / "codebase" / "prototype"
PORT = int(os.environ.get("PORT", "8000"))


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
        if self.path == "/api/health":
            key_ok = bool(os.environ.get("GEMINI_API_KEY")) if core.PROVIDER == "gemini" else True
            return self._json({"provider": core.PROVIDER, "model": core.MODEL, "configured": key_ok})
        if self.path == "/api/faq":
            return self._json({"items": core.FAQ})
        return super().do_GET()

    def do_POST(self):
        if self.path != "/api/decide":
            return self._json({"error": "not found"}, 404)
        try:
            length = int(self.headers.get("Content-Length", 0))
            text = str(json.loads(self.rfile.read(length) or b"{}").get("text", "")).strip()[:2000]
        except (ValueError, json.JSONDecodeError):
            return self._json({"error": "body phải là JSON {\"text\": ...}"}, 400)
        if not text:
            return self._json({"error": "thiếu text"}, 400)
        rec = core.decide(text, meta={"source": "demo-ui"})
        faq = core.FAQ_BY_ID.get((rec["decision"] or {}).get("faq_id"))
        self._json({k: rec[k] for k in ("log_id", "provider", "model", "decision", "route", "reply", "error", "latency_ms")} | {"faq": faq})


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    print(f"Provider: {core.PROVIDER} · model: {core.MODEL}")
    print(f"Mở http://localhost:{PORT}  (Ctrl+C để dừng)")
    ThreadingHTTPServer(("127.0.0.1", PORT), Handler).serve_forever()
