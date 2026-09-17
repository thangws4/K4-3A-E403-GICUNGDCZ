# Bộ thử trực tiếp trên máy nhóm (R6, có quan sát)

**Cách làm:** người thử ngồi dùng `/demo` trên laptop của nhóm (AI thật). **1 người trong nhóm ngồi cạnh quan sát và ghi phiếu**, không giải thích, không gợi ý. Khoảng **10–12 phút / người**.

Kết quả ghi vào [`README.md`](README.md). Câu người thử gõ và route của bot có sẵn trong log theo mã U, nên người quan sát **không cần chép lại**, chỉ tập trung ghi *lời nói* và *chỗ khựng*.

## 1 · Chuẩn bị (5 phút, trước người đầu tiên)

- [ ] Kiểm tra `.env` có key còn dùng được. Key cũ đã lộ trên GitHub, nên thay key mới trước.
- [ ] Chạy `powershell -ExecutionPolicy Bypass -File validation/start-local-test.ps1 -Tester U1`. Script gọi thử 1 lần: nếu thấy `"error"` có `429` thì hết quota, phải đổi key trước khi mời người.
- [ ] Trình duyệt mở `http://127.0.0.1:8000/demo?tester=U1`, góc trên hiện **"Người thử U1"**. Phóng to 110–125% cho dễ đọc.
- [ ] In hoặc mở sẵn phiếu quan sát (mục 4) cho người quan sát.
- [ ] Chuẩn bị đồng hồ bấm giờ (điện thoại).

**Gán mã:** U1, U2 = 2 willing user đã khai ở CP1 · U3–U5 = học viên K4 ngoài nhóm. Bảng mã ↔ tên **chỉ lưu ngoài repo**.

**Giữa 2 người thử:** mở tab mới với mã kế tiếp (`…/demo?tester=U2`), đóng tab cũ để người sau không thấy hội thoại của người trước.

## 2 · Lời dẫn (người quan sát đọc gần nguyên văn)

> "Cảm ơn bạn! Nhóm đang thử một bản bot Trợ lý Discord. Đây là thử **bot**, không phải thử bạn, nên không có đúng hay sai.
> Trên màn hình có 3 việc. Bạn cứ gõ như khi hỏi bot thật trên Discord. **Vừa làm vừa nói ra điều bạn đang nghĩ**, ví dụ 'ơ sao nó lại…', 'mình đang tìm…'.
> Mình sẽ ngồi im ghi chép và **không giúp** trong lúc bạn làm. Nếu thấy bí quá thì cứ nói 'bỏ qua', mình chuyển việc tiếp theo. Bạn có thể dừng bất cứ lúc nào."

## 3 · Quy tắc cho người quan sát

- **Không giải thích** bot, nút, hay thuật ngữ trên màn hình, kể cả khi người thử hỏi. Nếu người thử hỏi, trả lời: *"Bạn nghĩ nó là gì?"* rồi ghi lại câu hỏi đó.
- **Người thử im lặng quá 10 giây:** nhắc nhẹ *"Bạn đang nghĩ gì?"*.
- **Kẹt quá 2 phút ở 1 việc:** ghi **Bỏ dở**, rồi bảo *"Mình chuyển sang việc tiếp nhé"*.
- **Chép đúng lời người thử nói**, kể cả nói trống không hay nói sai. Không tóm tắt thành ý của mình.
- **Không hỏi** "bạn có thích không", "có dùng không". Chỉ hỏi 3 câu ở cuối (mục 5).

## 4 · Phiếu quan sát (1 phiếu / người)

**Mã:** U__ · **Khai từ CP1:** Có / Không · **Người quan sát:** ______ · **Bắt đầu:** __:__ · **Kết thúc:** __:__

| | Việc 1 · điểm danh của mình | Việc 2 · hạn nộp daily | Việc 3 · nhờ cộng XP |
|---|---|---|---|
| **Thời gian làm** (giây) | | | |
| **Số lần gõ** | | | |
| **Kết quả** | Xong · Xong nhưng không chắc · Bỏ dở | Xong · Xong nhưng không chắc · Bỏ dở | Xong · Xong nhưng không chắc · Bỏ dở |
| **Khựng ở đâu** (khựng > 5 giây, đọc lại, cuộn lên xuống, hỏi người quan sát) | | | |
| **Bấm nút nào** trong tin của bot | | | |
| **Lời nói nguyên văn** (chép đúng, trong ngoặc kép) | | | |
| **Người thử hiểu bot đã làm gì?** (theo lời họ nói) | | | |

## 5 · Hỏi ngay sau khi làm xong (3 câu, chép nguyên văn)

1. *"Ở việc 1, sau khi bot trả lời, nếu đây là thật thì bước tiếp theo bạn sẽ làm gì?"*
2. *"Lúc nào bạn thấy bối rối nhất? Kể lại lúc đó."*
3. *"Có chỗ nào bạn muốn làm mà màn hình không cho làm không?"*

## 6 · Sau buổi thử

1. Chạy `python validation/export_tester_logs.py --md` → `validation/tester-logs.md` (câu đã gõ, route, `log_id`).
2. Điền [`README.md`](README.md), mỗi dòng = 1 người × 1 việc. Cột quote chép **đúng** phiếu. Giữ phiếu gốc (ảnh chụp) **ngoài repo**.
3. Viết 4 dòng tổng kết; thêm ≥1 thay đổi (hoặc lý do giữ nguyên) vào `spec.md` §9.
4. Gửi phiếu cho Claude nếu cần sắp vào bảng: **chỉ sắp dữ liệu có trên phiếu**, không điền thêm.
