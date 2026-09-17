"""In lại mọi câu người thử đã gõ và bot đã trả lời, gom theo mã người thử (U1…U5).

    python validation/export_tester_logs.py            # in ra màn hình
    python validation/export_tester_logs.py --md       # ghi validation/tester-logs.md

Nguồn: codebase/logs/llm_calls.jsonl (các dòng meta.source = "tester").
Chỉ dùng để điền bảng nhật ký R6; không chép log thô (có system prompt) lên repo.
"""
from __future__ import annotations

import json
import sys
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LOG = ROOT / "codebase" / "logs" / "llm_calls.jsonl"


def main() -> None:
    sys.stdout.reconfigure(encoding="utf-8")
    if not LOG.exists():
        print(f"Chưa có log: {LOG}")
        return
    by_tester = defaultdict(list)
    for line in LOG.read_text(encoding="utf-8").splitlines():
        r = json.loads(line)
        if r.get("meta", {}).get("source") == "tester":
            by_tester[r["meta"]["tester"]].append(r)

    out = ["# Log người thử (tự sinh từ codebase/logs/llm_calls.jsonl)", ""]
    for tester in sorted(by_tester, key=lambda t: int(t[1:])):
        out += [f"## {tester}", "", "| Thời điểm | Người thử gõ (nguyên văn) | Route | intent · độ tin | Bot trả lời | log_id |", "|---|---|---|---|---|---|"]
        for r in by_tester[tester]:
            d = r.get("decision") or {}
            cell = lambda s: str(s).replace("|", "/").replace("\n", " ")
            out.append(f"| {r['ts'][11:16]} | {cell(r['input'])} | {r['route']} | {d.get('intent', '-')} · {d.get('confidence', '-')} | "
                       f"{cell(r['reply'] or r.get('error') or '')[:120]} | {r['log_id']} |")
        out.append("")
    if not by_tester:
        out.append("Chưa có lượt nào từ người thử (link phải có ?tester=U1…).")

    text = "\n".join(out) + "\n"
    if "--md" in sys.argv:
        path = ROOT / "validation" / "tester-logs.md"
        path.write_text(text, encoding="utf-8")
        print(f"Đã ghi {path.relative_to(ROOT)}")
    else:
        print(text)


if __name__ == "__main__":
    main()
