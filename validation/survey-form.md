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


Ghi vào `survey-pain.md`: mã người (P1, P2…), ngày, quote nguyên văn, giả thuyết mà câu trả lời xác nhận hoặc bác bỏ.
