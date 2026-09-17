# Thử nội bộ bằng persona giả lập (KHÔNG phải R6)

> **Đây không phải nhật ký người dùng thật.** 10 tin nhắn dưới đây do AI viết theo 3 persona giả lập (P1: gõ đầy đủ · P2: không dấu, viết tắt · P3: hỏi mơ hồ, trả lời nối tiếp), gửi qua module quyết định thật để **dò lỗi trước khi mời người thử**. Trong log, các lời gọi này có `meta.source = "pilot-ai"` (kiểm chứng được bằng `log_id`). Kết quả không được tính vào R6 và không dùng làm quote.

**Ngày:** 17/09/2026 · **Model:** gemini/gemini-3.5-flash · **Số lời gọi AI:** 10 (0 lỗi, độ trễ 2,3–3,6 s)


## Kết quả

| Persona | Việc | Tin persona gõ (AI viết) | Route (intent · độ tin) | Có đúng ý persona không | Chỗ có thể kẹt | log_id |
|---|---|---|---|---|---|---|
| P1 | 1 | Workshop tối thứ 3 vừa rồi mình có được điểm danh không ạ? | `handoff` (PERSONAL_RECORD · 0,95) | Đúng | Bot nói "TA sẽ trả lời bạn trong thread này" nhưng trong bản thử không có TA nào trả lời → không biết chờ tới bao giờ (Q5) | addc1fed3d07 |
| P1 | 2 | Hạn nộp daily standup mỗi ngày là mấy giờ vậy bot? | `answer` · FAQ `daily_time` (GENERAL · 1,0) | Đúng | Không | 3a610916cbde |
| P1 | 3 | Bot cộng thêm XP cho mình với được không | `handoff` (OUT_OF_SCOPE · 0,95) | Đúng route, **lời nhắn lệch** | Câu bot nói "không **xem** được hồ sơ… nên không **trả lời** thay được", trong khi người thử nhờ **cộng** XP, không hỏi gì cả. Người thử có thể hiểu là TA sẽ cộng XP cho mình | 4a9b7c8c6aba |
| P2 | 1 | t co dc diem danh buoi ws hom qua ko | `handoff` (PERSONAL_RECORD · 0,90) | Đúng | Như P1-1 | 3bff5ac3bde9 |
| P2 | 2 | daily nop truoc may h | `answer` · `daily_time` (GENERAL · 0,95) | Đúng | Không | 6b65315f9572 |
| P2 | 3 | cong xp cho t di | `handoff` (OUT_OF_SCOPE · 0,95) | Đúng route, lời nhắn lệch | Như P1-3 | a6f3f152fbe2 |
| P3 | 1 | check điểm danh workshop như nào | `no_grounding` (GENERAL · 0,65, loại attendance) | **Sai.** Người thử muốn tra điểm danh của mình | Bot nói "không tìm thấy trong thông báo chính thức… **bấm nút** để mình hỏi TA", nhưng nút không bấm được → **ngõ cụt** | 07a92b0d0afe |
| P3 | 1 (gõ tiếp) | của mình | `no_grounding` (PERSONAL_RECORD · 0,30) | **Sai** | Bot không nhớ câu trước, nên lại trả lời "không tìm thấy trong thông báo chính thức", nghe rất vô lý. Người thử bỏ cuộc ở việc 1 | e6aa4db7021a |
| P3 | 2 | daily standup hôm nay mình nộp lúc 11h có sao không | `answer` · `daily_time` (GENERAL · 0,90) | Chấp nhận được | Câu trả lời đúng với quy định chung ("vẫn ghi nhận, không cộng XP") | 2f4cbb9642c7 |
| P3 | 3 | mình đi workshop đủ mà XP thấp quá, cộng thêm giúp mình với | `handoff` (OUT_OF_SCOPE · 0,90) | Đúng | Như P1-3 | 0b5bf24945c7 |

## Chỗ kẹt tìm được, xếp theo mức nặng

1. **Nút trong tin của bot không bấm được** (`demo.html`, `.bot-buttons span`, không có handler). Cả 6 route đều hiện nút, và route `clarify` / `no_grounding` **bảo người thử bấm nút**. Người thử thật gần như chắc chắn sẽ ghi chỗ này vào Q12. Nếu không sửa, việc 1 của người hỏi mơ hồ sẽ dừng ở ngõ cụt.
2. **Câu hỏi mơ hồ về hồ sơ ra `no_grounding` thay vì `clarify`** (P3-1). Đây là đúng lỗi H2-1: `GENERAL`, độ tin < 0,75, có `record_type` → luật hiện tại không hỏi lại. Việc sửa đã nằm trong "Kế hoạch lượt 2" ở `spec.md` §9 nhưng **chưa áp dụng**. Nhiều khả năng sẽ gặp lại với người thật, vì việc 1 dễ bị gõ kiểu "check điểm danh như nào".
3. **Bot không nhớ câu trước.** Mỗi tin là 1 lời gọi riêng, nên khi người thử trả lời tiếp ("của mình") thì bot hiểu sai. Với người thử không đồng bộ, đây là cách phản ứng tự nhiên nhất khi bot hỏi lại.
4. **Lời nhắn `handoff` giống hệt nhau cho "hỏi hồ sơ" và "nhờ sửa hồ sơ"** (việc 3). Nên có câu riêng, ví dụ: "Mình không cộng/sửa XP được; mình đã chuyển TA xem trường hợp của bạn."
5. **"TA sẽ trả lời bạn trong thread này"** mà không có gì xảy ra. Người thử sẽ khó trả lời Q5 ("bước tiếp theo"). Nên thêm 1 dòng nhỏ ở chế độ người thử: "(Bản thử: không có TA thật, bạn chuyển sang việc tiếp theo.)"
6. **Bảng bên phải lộ cách bot quyết định** (PERSONAL_RECORD, độ tin, "→ chuyển TA"). Người thử có thể chép lại ở Q4 thay vì kể bằng lời mình, và gặp thuật ngữ khó hiểu (`injection: false`). Cân nhắc ẩn thẻ "AI Decision Pipeline" ở chế độ người thử, hoặc chỉ hiện sau khi làm xong 3 việc.

## Không thấy vấn đề
- Gõ không dấu, viết tắt (P2): cả 3 việc đều ra đúng route.
- Việc 2 (hạn nộp daily): 3/3 trả lời đúng FAQ, có nguồn.
- Việc 3 không bị hiểu là injection, không bị từ chối nhầm.
