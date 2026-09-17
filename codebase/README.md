# Codebase — Prototype

**Mức prototype:** CP2 là **Mock** (luồng bấm được, chưa gọi AI) → CP3 là **Mock + 1 lời gọi AI thật** (phân loại intent).

> Luật chung: mức nào cũng bắt buộc **≥1 lời gọi AI chạy thật**; phần này bắt buộc có trước CP3.

## Chạy thử

Mở [`prototype/index.html`](prototype/index.html) bằng trình duyệt, không cần cài đặt.

- Cột trái: 8 kịch bản phủ happy path, ② low-confidence, ① failure, correction, ③ ngoài phạm vi, ④ đặc thù domain.
- Cột giữa: kênh Discord mô phỏng; có thể tự gõ câu hỏi.
- Cột phải: hàng đợi TA · JSON quyết định AI · nhật ký sửa sai.

Sơ đồ luồng: [`prototype/flow.md`](prototype/flow.md).

API key (từ CP3) đặt trong file `.env` (đã có trong `.gitignore`); **không commit key**.

## Phần nào chạy thật / phần nào mock

| Thành phần | CP2 | CP3 → demo |
|---|---|---|
| Giao diện kênh Discord + hàng đợi TA | Mock (HTML tĩnh) | Mock (giữ HTML) |
| Phân loại intent + độ tin + tóm tắt | Mock (luật từ khoá trong `classify()`) | **Thật: 1 lời gọi LLM trả JSON cùng schema** |
| Nguồn chính thức (FAQ) | Mock (3 mục giả) | Mock, thay bằng nội dung thông báo thật nhóm thu thập |
| Tag TA / thông báo cho học viên | Mock (thẻ trong cột TA) | Mock |
| Câu trả lời của TA | Mock (câu mẫu) | Mock |
| Nhật ký sửa sai | Mock (hiển thị trên trang) | Xuất JSON để bổ sung `eval/` |

Không dùng dữ liệu trong `data/`: mọi câu hỏi trong kịch bản đều do nhóm tự viết.
