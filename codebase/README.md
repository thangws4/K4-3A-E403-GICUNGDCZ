# Codebase — Prototype

**Mức prototype:** Mock + **1 lời gọi AI thật** ở mắt xích quyết định trung tâm (phân loại tin nhắn học viên).

```
codebase/
├── decision/
│   ├── decide.py    ← module quyết định: prompt → gọi LLM → parse JSON → route() → reply, có ghi log
│   ├── faq.json     ← nguồn chính thức (giả lập)
│   └── server.py    ← server demo: phục vụ giao diện + POST /api/decide
├── prototype/
│   ├── index.html   ← giao diện Discord mô phỏng + hàng đợi TA
│   ├── eval.html    ← trang eval: tỉ lệ đạt theo nhóm, 25 ca, prompt/phản hồi thô, chạy lại 1 ca
│   ├── demo.html    ← trang demo thuyết trình: 8 kịch bản, 4 bước bên trong, bot cũ vs bot mới, phát lại log
│   └── flow.md      ← sơ đồ luồng
└── logs/            ← log gọi LLM lúc demo (không commit)
```

## Cài đặt

Chỉ cần Python ≥ 3.10, **không cần cài thư viện** (gọi REST API bằng `urllib`).

```bash
cp .env.example .env      # rồi điền GEMINI_API_KEY (lấy tại https://aistudio.google.com/apikey)
```

`.env` đã nằm trong `.gitignore`; **không commit key**. Muốn chạy local không cần key: đặt `LLM_PROVIDER=ollama`.

## Chạy

```bash
# 1 câu, in JSON quyết định
python codebase/decision/decide.py "mình chưa thấy được điểm danh buổi tối qua"

# trang demo thuyết trình     → mở http://localhost:8000/demo
# giao diện chat mô phỏng     → mở http://localhost:8000
# trang eval golden set       → mở http://localhost:8000/eval
python codebase/decision/server.py

# kiểm thử toàn bộ golden set (25 ca) → eval/runs/
python eval/run_eval.py
```

Góc phải trên giao diện hiện **AI THẬT · gemini / <model>** khi server có key. Mở thẳng `index.html` bằng trình duyệt (không qua server) thì tự quay về **MOCK** (luật từ khoá).

## Ghi vết (logging)

Mỗi lời gọi ghi 1 dòng JSON gồm: `log_id`, thời điểm, provider/model, `input`, **`prompt.system` + `prompt.user`**, **`raw_response`** (văn bản thô của model), `decision` đã parse, `route`, `reply`, `error`, `latency_ms`.
- Demo: `codebase/logs/llm_calls.jsonl`
- Eval: `eval/runs/<run_id>.jsonl` (có commit, để kiểm chứng)

## Quyết định của AI và của luật

| Bước | Ai làm |
|---|---|
| Phân loại intent, độ tin, loại hồ sơ, cờ gấp, cờ injection, chọn mục FAQ, tóm tắt | **LLM (thật)** |
| Chọn route (chuyển TA / hỏi lại / trả lời / không đoán / từ chối) | Luật cố định `route()` theo ngưỡng 0,75 / 0,45 |
| Lời trả lời học viên | Mẫu câu cố định + nội dung FAQ (LLM không tự viết câu trả lời) |
| Khi gọi LLM lỗi | Mặc định chuyển TA |

## Phần nào chạy thật / phần nào mock

| Thành phần | Trạng thái |
|---|---|
| Phân loại tin nhắn | **Thật** (Gemini) |
| Giao diện kênh Discord + hàng đợi TA | Mock (HTML tĩnh) |
| Nguồn chính thức (FAQ) | Mock: tóm từ câu trả lời bot hiện có, chưa được BTC xác nhận |
| Tag TA, câu trả lời của TA | Mock |
| Nhật ký sửa sai | Mock (chỉ hiển thị trên trang) |
