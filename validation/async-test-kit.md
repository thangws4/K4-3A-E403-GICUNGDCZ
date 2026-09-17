# Bộ thử không đồng bộ (R6): tin nhắn mời + Google Form

**Cách làm:** người thử tự mở link, tự làm 3 việc trên trang demo (gọi AI thật), rồi điền Google Form. Nhóm **không quan sát trực tiếp**. Điều này được ghi rõ trong nhật ký ([`README.md`](README.md)) và `spec.md`.

## 1 · Chuẩn bị (người chạy máy)

1. Kiểm tra `.env` có `GEMINI_API_KEY`, và quota hôm nay còn (5 người × 3 việc ≈ 15 lời gọi).
2. Từ gốc repo chạy:
   ```powershell
   powershell -ExecutionPolicy Bypass -File validation/start-public-test.ps1
   ```
3. Copy link tunnel in ra (`https://….trycloudflare.com` hoặc `https://….lhr.life`), thử mở `<link>/demo?tester=U0` trên điện thoại. Gõ 1 câu để chắc AI chạy, lượt thử này **không** tính vào nhật ký.
4. Giữ máy bật, không cho ngủ, cho tới khi cả 5 người làm xong. Xong thì **Ctrl+C** để tắt tunnel.

**Gán mã:** U1, U2 = 2 willing user đã khai ở CP1 · U3, U4, U5 = 3 học viên K4 ngoài nhóm. Bảng mã ↔ người **chỉ lưu trong máy leader**, không đưa lên repo.

## 2 · Tin nhắn mời (gửi riêng từng người, thay `<link>` và `U?`)

> Chào bạn! Nhóm mình (GICUNGDCZ, lớp 3A) đang làm Mini Hackathon AI: một bản bot Trợ lý Discord **biết khi nào không nên tự trả lời**. Bạn giúp nhóm thử khoảng **10 phút** nhé:
>
> 1. Mở link: `<link>/demo?tester=U?` (điện thoại hay máy tính đều được)
> 2. **Tự gõ** vào ô chat để làm lần lượt 3 việc (hướng dẫn cũng hiện trên trang):
>    - Hỏi bot xem buổi workshop gần nhất **bạn** đã được điểm danh chưa
>    - Hỏi bot hạn nộp daily standup mỗi ngày là khi nào
>    - Nhờ bot cộng thêm XP cho bạn
> 3. Điền form ngắn này ngay sau khi làm xong: `<link Google Form>` (mã của bạn: **U?**)
>
> Bot là bản thử nghiệm, không nối với hồ sơ thật, nên bạn cứ gõ thoải mái như khi hỏi bot thật. Nhóm không lưu tên bạn, chỉ lưu mã U?. Cảm ơn bạn nhiều!

*Không kể trước cho người thử bot sẽ "chuyển TA" hay "từ chối", để khỏi dắt kết quả.*

## 3 · Nội dung Google Form (copy từng câu)

**Mô tả form:**
> Form ẩn danh, khoảng 3 phút. Hãy kể đúng những gì đã xảy ra khi bạn dùng thử, kể cả chỗ bạn thấy khó hiểu hay không vừa ý. Nhóm cần nhất là những chỗ đó.

**Q1.** Mã người thử của bạn (trong tin nhắn mời) *[Trắc nghiệm · bắt buộc]*
- U1 · U2 · U3 · U4 · U5

**Q2.** Bạn dùng thử bằng thiết bị nào? *[Trắc nghiệm · bắt buộc]*
- Điện thoại · Máy tính

### Việc 1: hỏi điểm danh của bạn

**Q3.** Bạn đã gõ gì cho bot? Copy lại nếu còn, không thì ghi gần đúng. *[Trả lời ngắn · bắt buộc]*

**Q4.** Theo bạn, bot đã làm gì với câu hỏi đó? *[Đoạn văn · bắt buộc]*
> Kể bằng lời của bạn, không cần đúng thuật ngữ.

**Q5.** Sau câu trả lời đó, bạn có biết bước tiếp theo mình cần làm hoặc chờ gì không? *[Trắc nghiệm · bắt buộc]*
- Biết rõ · Biết nhưng chưa chắc · Không biết

**Q6.** Có chỗ nào bạn khựng lại, khó hiểu hoặc không như mong đợi? *[Đoạn văn · không bắt buộc]*

### Việc 2: hỏi hạn nộp daily standup

**Q7.** Bạn đã gõ gì cho bot? *[Trả lời ngắn · bắt buộc]*

**Q8.** Bot trả lời có giúp được bạn không? Vì sao? *[Đoạn văn · bắt buộc]*

### Việc 3: nhờ bot cộng XP

**Q9.** Bạn đã gõ gì cho bot? *[Trả lời ngắn · bắt buộc]*

**Q10.** Bot phản ứng thế nào, và bạn thấy sao về phản ứng đó? *[Đoạn văn · bắt buộc]*

### Chung

**Q11.** Trong cả 3 việc, lúc nào bạn thấy **khó chịu hoặc bối rối nhất**? Kể lại lúc đó. *[Đoạn văn · không bắt buộc]*

**Q12.** Có gì bạn đã thử làm mà trang **không cho làm**, hoặc bạn muốn bấm mà không bấm được? *[Đoạn văn · không bắt buộc]*

## 4 · Sau khi thu đủ

1. `python validation/export_tester_logs.py --md` → `validation/tester-logs.md`: mỗi người đã gõ gì, bot route gì, có `log_id` để kiểm chứng.
2. Điền [`README.md`](README.md): mỗi dòng = 1 người × 1 việc. Cột "Quote nguyên văn" chép **đúng** câu trả lời form (giữ lỗi chính tả).
3. Viết 4 dòng tổng kết; thêm ≥1 thay đổi (hoặc lý do giữ nguyên) vào `spec.md` §9.
4. Export Google Form ra CSV để lưu **ngoài repo** làm bằng chứng gốc.
