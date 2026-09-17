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

## 3 · Nội dung Google Form

**Tạo tự động bằng code:** dán [`create_form.gs`](create_form.gs) vào https://script.google.com (New project), rồi chạy hàm `createR6Form`. Script tạo form đúng các câu dưới đây, kèm Google Sheet nhận câu trả lời, và in 3 link (link gửi người thử, link sửa form, link sheet) trong Execution log.

**Nguyên tắc:** câu hỏi lựa chọn mô tả **điều đã xảy ra** (bot làm gì, người thử làm gì tiếp), không hỏi "có thích không". Câu người thử gõ **không hỏi lại**, vì server đã lưu theo mã U. Chỉ **Q12** là ô tự viết, để lấy quote nguyên văn cho R6.

| # | Câu hỏi | Loại | Lựa chọn |
|---|---|---|---|
| Q1 | Mã người thử | Danh sách · bắt buộc | U1 · U2 · U3 · U4 · U5 |
| Q2 | Thiết bị | Trắc nghiệm · bắt buộc | Điện thoại · Máy tính |
| **Việc 1** | *hỏi điểm danh của mình* | | |
| Q3 | Bot đã làm gì? | Trắc nghiệm · bắt buộc | Trả lời luôn đã/chưa được điểm danh · Giải thích quy định chung · Nói không xem được hồ sơ và chuyển TA/Mod · Hỏi lại của mình hay quy định chung · Nói không tìm thấy · Báo lỗi / không trả lời · Không nhớ |
| Q4 | Có biết bước tiếp theo không? | Trắc nghiệm · bắt buộc | Biết rõ · Biết nhưng chưa chắc · Không biết |
| Q5 | Có phải gõ lại không? | Trắc nghiệm · bắt buộc | Không, 1 lần là xong · Gõ lại 1 lần · Gõ lại ≥ 2 lần · Bỏ dở |
| Q6 | Chỗ khựng lại | Hộp kiểm · tuỳ chọn · có "Khác" | Không có · Không chắc TA có nhận không · Không biết chờ bao lâu / ở đâu · Trả lời quá dài · Bot hiểu sai ý · Không biết bấm nút nào · Chờ bot lâu |
| **Việc 2** | *hỏi hạn nộp daily standup* | | |
| Q7 | Bot đã làm gì? | Trắc nghiệm · bắt buộc | Trả lời có ghi nguồn · Trả lời không thấy nguồn · Nói không tìm thấy · Chuyển TA/Mod · Hỏi lại · Báo lỗi · Không nhớ |
| Q8 | Có giúp biết nộp lúc nào không? | Trắc nghiệm · bắt buộc | Đủ để làm theo ngay · Một phần, vẫn phải hỏi thêm · Không giúp được |
| **Việc 3** | *nhờ bot cộng XP* | | |
| Q9 | Bot đã làm gì? | Trắc nghiệm · bắt buộc | Nói đã cộng XP · Từ chối, chỉ TA/Mod sửa được · Chuyển TA/Mod · Hỏi lại · Trả lời chuyện khác · Báo lỗi · Không nhớ |
| Q10 | Thấy phản ứng đó thế nào? | Trắc nghiệm · bắt buộc | Hợp lý, đúng như nghĩ · Hợp lý nhưng hơi khó chịu · Không hợp lý · Không có ý kiến |
| **Nhìn lại** | | | |
| Q11 | Lúc bối rối nhất | Trắc nghiệm · bắt buộc | Việc 1 · Việc 2 · Việc 3 · Không lúc nào |
| Q12 | **Kể lại lúc đó bằng lời của bạn** | Đoạn văn · tuỳ chọn | *(quote nguyên văn cho R6)* |
| Q13 | Đã thử bấm nút nào trong tin của bot | Hộp kiểm · tuỳ chọn · có "Khác" | Không bấm · Sửa tóm tắt · Bot hiểu sai · Không cần chuyển TA · Của mình / quy định chung · Hỏi TA giúp mình · Chuyển TA kiểm tra |

**Cách đọc để điền nhật ký:**
- Q3, Q7, Q9 đối chiếu với route trong log: người thử có **nhận ra** bot làm gì không.
- Q4, Q5, Q6, Q8, Q10 → cột "Kẹt ở đâu".
- Q12 → cột "Quote nguyên văn".
- Q13 cho biết người thử có cố bấm nút minh hoạ (trên `/demo` các nút sửa sai chưa hoạt động) hay không.

## 4 · Sau khi thu đủ

1. `python validation/export_tester_logs.py --md` → `validation/tester-logs.md`: mỗi người đã gõ gì, bot route gì, có `log_id` để kiểm chứng.
2. Điền [`README.md`](README.md): mỗi dòng = 1 người × 1 việc. Cột "Quote nguyên văn" chép **đúng** câu trả lời form (giữ lỗi chính tả).
3. Viết 4 dòng tổng kết; thêm ≥1 thay đổi (hoặc lý do giữ nguyên) vào `spec.md` §9.
4. Export Google Form ra CSV để lưu **ngoài repo** làm bằng chứng gốc.
