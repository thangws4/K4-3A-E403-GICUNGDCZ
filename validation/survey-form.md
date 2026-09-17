# Form khảo sát: "Khi nghi mình chưa được ghi nhận điểm"

> **Dùng cho:** bằng chứng chuẩn A trong `spec.md` §1, xác nhận nỗi đau trước khi build.
> **Cách dùng:** copy từng câu vào Google Forms (loại câu ghi trong ngoặc vuông). Gửi cho học viên khoá 4 **ngoài nhóm**. Kết quả tổng hợp ghi vào [`survey-pain.md`](survey-pain.md).
> **Thời lượng:** khoảng 3 phút · **Ẩn danh:** không thu tên, MSSV hay email (chỉ phần 5 là tuỳ chọn).

## Nguyên tắc khi soạn (Mom Test)

- Hỏi **chuyện đã xảy ra**, không hỏi "bạn có muốn / có dùng không".
- Không nhắc tới giải pháp của nhóm (chuyển TA) trước phần 4, để khỏi dắt câu trả lời.
- Không nhắc tới dữ liệu Discord trong pack, và không hỏi về tin nhắn của người khác.

## Giả thuyết cần kiểm tra (chốt trước khi gửi form)

| # | Giả thuyết | Câu hỏi đo | Xác nhận khi |
|---|---|---|---|
| H1 | Học viên **thường xuyên** nghi mình chưa được ghi nhận điểm danh/XP/bài nộp | Q3 | ≥ 50% người trả lời chọn ít nhất 1 loại |
| H2 | Họ **không tự tra được** mà phải hỏi người/bot | Q5, Q6 | ≥ 50% (trong số có gặp) phải hỏi ≥ 2 nơi, hoặc vẫn chưa có câu trả lời |
| H3 | Hỏi bot thì **không biết được trạng thái của mình** | Q9 | ≥ 50% người đã hỏi bot chọn một phương án "không biết được trạng thái" |
| H4 | Hậu quả là **thật**: mất thời gian dài hoặc mất điểm | Q7, Q8 | ≥ 30% (trong số có gặp) mất ≥ 1 ngày mới biết, **hoặc** bị thiếu điểm |

> Không đạt ngưỡng thì vẫn ghi đúng số vào `survey-pain.md` và cập nhật §1/§2 của spec. Số xấu vẫn được tính điểm, sửa số thì không.

---

## Nội dung form

### Mở đầu *(mô tả form)*

> Chào bạn! Nhóm **GICUNGDCZ** (lớp 3A) đang tìm hiểu trải nghiệm của học viên khoá 4 khi **không chắc mình đã được ghi nhận** điểm danh, XP hay bài nộp. Form mất khoảng 3 phút, **ẩn danh**, và chỉ dùng cho Mini Hackathon AI.
> Không có câu trả lời đúng hay sai. Hãy kể đúng những gì đã xảy ra với bạn, kể cả khi bạn chưa từng gặp tình huống này.

### Phần 1 · Về bạn

**Q1.** Bạn đang học ở server/level nào? *[Trắc nghiệm · bắt buộc]*
- K4 · L2–3
- K4 · L3–4
- Khác

**Q2.** Tuần vừa rồi bạn dùng Discord của khoá thường xuyên cỡ nào? *[Trắc nghiệm · bắt buộc]*
- Gần như mỗi ngày
- 2–4 ngày/tuần
- Ít hơn 2 ngày/tuần

### Phần 2 · Lần gần nhất bạn không chắc mình được ghi nhận

**Q3.** Từ khi bắt đầu Build Phase, bạn đã từng **nghi mình chưa được ghi nhận** những gì? *[Hộp kiểm · bắt buộc]*
- Điểm danh workshop / buổi học
- XP (tham gia, phát biểu, commit, thảo luận…)
- Daily standup
- Bài lab / codelab đã nộp
- Khác: ____
- **Chưa từng gặp** → *chuyển tới Phần 5*

**Q4.** Hãy kể **lần gần nhất**: chuyện gì đã xảy ra? *[Đoạn văn · bắt buộc]*
> Gợi ý: hôm đó bạn làm gì, vì sao bạn nghĩ mình chưa được ghi nhận.

**Q5.** Lúc đó, **việc đầu tiên** bạn làm là gì? *[Trắc nghiệm · bắt buộc]*
- Tự tra (lệnh `/rank`, app, VLearn…)
- Tag bot "Trợ lý" trên Discord
- Hỏi trên kênh chung
- Nhắn riêng TA / Mod / BTC
- Mở ticket
- Gửi email
- Hỏi bạn cùng lớp
- Không làm gì cả
- Khác: ____

**Q6.** Tính tổng cộng, bạn đã **hỏi hoặc thử bao nhiêu nơi** trước khi biết chắc? *[Trắc nghiệm · bắt buộc]*
- 1 nơi là đủ
- 2 nơi
- 3 nơi trở lên
- Đến giờ vẫn chưa biết chắc

**Q7.** Mất **bao lâu** từ lúc bạn bắt đầu hỏi đến lúc biết chắc? *[Trắc nghiệm · bắt buộc]*
- Dưới 1 giờ
- Trong cùng ngày
- 1–2 ngày
- Hơn 2 ngày
- Đến giờ vẫn chưa biết

**Q8.** Kết quả cuối cùng là gì? *[Trắc nghiệm · bắt buộc]*
- Hoá ra mình đã được ghi nhận từ đầu
- Bị thiếu, và đã được sửa
- Bị thiếu, không sửa được (mất điểm/XP)
- Không biết, không ai trả lời rõ
- Khác: ____

**Q9.** Trong lần đó, bạn có **tag bot "Trợ lý"** không? Nếu có, bot đã trả lời thế nào? *[Trắc nghiệm · bắt buộc]*
- Không hỏi bot
- Bot cho mình biết rõ trạng thái, hoặc chuyển đúng người kiểm tra
- Bot nhắc lại quy tắc chung (ví dụ cách để được điểm danh), không nói gì về trường hợp của mình
- Bot hỏi lại / bắt chọn 1–2–3
- Bot trả lời dài nhưng mình vẫn không biết mình có được ghi nhận không
- Không nhớ

**Q10.** Nếu nhớ, bạn đã **gõ gì cho bot**? Chép lại gần đúng, kể cả viết tắt. *[Trả lời ngắn · không bắt buộc]*

**Q11.** Tình huống đó ảnh hưởng tới bạn thế nào? *[Đoạn văn · không bắt buộc]*
> Ví dụ: mất thời gian, lo lắng, phải nhắn nhiều người, bỏ qua luôn…

### Phần 3 · Nơi hỏi *(chỉ hiện nếu Q3 ≠ "Chưa từng gặp")*

**Q12.** Nếu gặp lại tình huống này **vào tuần sau**, bạn định hỏi ở đâu trước? Vì sao? *[Đoạn văn · không bắt buộc]*

### Phần 4 · Điều gì sẽ giúp *(hỏi sau cùng để không dắt câu trả lời)*

**Q13.** Nghĩ lại lần gần nhất đó, **điều gì** sẽ giúp bạn biết chắc nhanh hơn? *[Đoạn văn · không bắt buộc]*

### Phần 5 · Thử sản phẩm *(tuỳ chọn)*

**Q14.** Nhóm cần vài bạn **thử bản prototype khoảng 10 phút** (dự kiến 17–18/9). Bạn có sẵn sàng không? *[Trắc nghiệm · bắt buộc]*
- Có
- Không

**Q15.** Nếu có, để lại **tên Discord** để nhóm liên hệ. *[Trả lời ngắn · không bắt buộc]*
> Thông tin này chỉ dùng để hẹn lịch thử, **không đưa lên repo công khai** và sẽ xoá sau hackathon.

---

## Kịch bản phỏng vấn trực tiếp (≥3 người, 10 phút)

Dùng cùng giả thuyết H1–H4 với form. Người hỏi **ghi nguyên văn** câu trả lời; không gợi ý, không giới thiệu giải pháp.

1. "Lần gần nhất bạn không chắc mình đã được điểm danh hay được cộng XP là khi nào? Kể mình nghe chuyện hôm đó."
2. "Lúc đó bạn làm gì đầu tiên? Rồi sau đó làm gì?"
3. "Nếu có hỏi bot: bạn còn nhớ đã gõ gì không? Bot trả lời sao? Rồi bạn làm gì tiếp?"
4. "Cuối cùng ai cho bạn câu trả lời? Mất bao lâu?"
5. "Chuyện đó có làm bạn mất gì không: thời gian, điểm, hay phải nhắn nhiều người?"
6. "Còn ai khác bạn biết cũng gặp chuyện này không?" *(chỉ hỏi số lượng, không hỏi tên)*

Ghi vào `survey-pain.md`: mã người (P1, P2…), ngày, quote nguyên văn, giả thuyết mà câu trả lời xác nhận hoặc bác bỏ.
