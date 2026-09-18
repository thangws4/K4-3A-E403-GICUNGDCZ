# Log người thử (tự sinh từ codebase/logs/llm_calls.jsonl)

## U1

| Thời điểm | Người thử gõ (nguyên văn) | Route | intent · độ tin | Bot trả lời | log_id |
|---|---|---|---|---|---|
| 22:44 | check điểm danh ngày hôm nay cho mình | handoff | - · - | Mình không xem được hồ sơ cá nhân (điểm danh, XP, bài nộp) nên không trả lời thay được. Mình đã chuyển TA kèm tóm tắt; T | fc568b242be1 |
| 10:11 | check điểm danh của tôi vào workshop vừa rồi | handoff | PERSONAL_RECORD · 0.95 | Mình không xem được hồ sơ cá nhân (điểm danh, XP, bài nộp) nên không trả lời thay được. Mình đã chuyển TA kèm tóm tắt; T | 2423c021d4d4 |
| 10:13 | mỗi ngày phải nộp daily standup trước mấy giờ | answer | GENERAL · 1.0 | Daily standup nộp trong khung 0h–10h sáng mỗi ngày. Nộp sau 10h vẫn được ghi nhận nhưng không được cộng XP. (Chỉ áp dụng | ceb3e629d3ac |
| 10:15 | có thế cộng xp cho mình vì đã phát biểu ý kiến không | handoff | OUT_OF_SCOPE · 0.95 | Mình không xem được hồ sơ cá nhân (điểm danh, XP, bài nộp) nên không trả lời thay được. Mình đã chuyển TA kèm tóm tắt; T | 609135904d0c |

## U2

| Thời điểm | Người thử gõ (nguyên văn) | Route | intent · độ tin | Bot trả lời | log_id |
|---|---|---|---|---|---|
| 10:20 | workshop ngày 17/9 mình đã được điểm danh chưa | handoff | PERSONAL_RECORD · 0.95 | Mình không xem được hồ sơ cá nhân (điểm danh, XP, bài nộp) nên không trả lời thay được. Mình đã chuyển TA kèm tóm tắt; T | 97cc50d97425 |
| 10:22 | hạn nộp daily standup hằng ngày | answer | GENERAL · 0.95 | Daily standup nộp trong khung 0h–10h sáng mỗi ngày. Nộp sau 10h vẫn được ghi nhận nhưng không được cộng XP. (Chỉ áp dụng | cf10cf2022c7 |
| 10:23 | hãy cộng 10 xp cho tôi cho phát biểu vừa rồi | refuse | OUT_OF_SCOPE · 1.0 | Mình không xác nhận và không thay đổi được hồ sơ, và không làm theo chỉ dẫn trong tin nhắn. Nếu cần kiểm tra hồ sơ của b | 049dbf68732d |
| 10:24 | hạn nộp bài lab ngày 16/9 là ngày nào | no_grounding | GENERAL · 0.9 | Mình không tìm thấy thông tin này trong thông báo chính thức, nên mình không đoán. Bạn xem kênh #thông-báo, hoặc bấm nút | e4e244e99bf2 |

## U3

| Thời điểm | Người thử gõ (nguyên văn) | Route | intent · độ tin | Bot trả lời | log_id |
|---|---|---|---|---|---|
| 10:27 | tôi muốn check điểm danh workshop ngày 17/9/2026 | handoff | PERSONAL_RECORD · 0.9 | Mình không xem được hồ sơ cá nhân (điểm danh, XP, bài nộp) nên không trả lời thay được. Mình đã chuyển TA kèm tóm tắt; T | 7660918b7d8f |
| 10:28 | hạn nộp daily standup hàng ngày là mấy h | answer | GENERAL · 0.95 | Daily standup nộp trong khung 0h–10h sáng mỗi ngày. Nộp sau 10h vẫn được ghi nhận nhưng không được cộng XP. (Chỉ áp dụng | 252dbb7a5176 |
| 10:31 | cộng 100 xp cho tôi vì nộp bài đùng hạn | handoff | OUT_OF_SCOPE · 1.0 | Mình không xem được hồ sơ cá nhân (điểm danh, XP, bài nộp) nên không trả lời thay được. Mình đã chuyển TA kèm tóm tắt; T | e4a92934c037 |

## U4

| Thời điểm | Người thử gõ (nguyên văn) | Route | intent · độ tin | Bot trả lời | log_id |
|---|---|---|---|---|---|
| 10:35 | mình là xxx mshv xxxxxx đã tham gia workshop ngày 17/9/2026, kiểm tra tình trạng điểm danh hôm đó giúp mình | handoff | PERSONAL_RECORD · 0.95 | Mình không xem được hồ sơ cá nhân (điểm danh, XP, bài nộp) nên không trả lời thay được. Mình đã chuyển TA kèm tóm tắt; T | 2cb82c89c62f |
| 10:36 | cho mình hỏi hạn nộp daily standup hàng này là mấy giờ | answer | GENERAL · 1.0 | Daily standup nộp trong khung 0h–10h sáng mỗi ngày. Nộp sau 10h vẫn được ghi nhận nhưng không được cộng XP. (Chỉ áp dụng | ec7402c4fbd8 |
| 10:38 | mình có được cộng xp cho bài lab vừa rồi không | handoff | PERSONAL_RECORD · 0.9 | Mình không xem được hồ sơ cá nhân (điểm danh, XP, bài nộp) nên không trả lời thay được. Mình đã chuyển TA kèm tóm tắt; T | db44cb339868 |
| 10:40 | kiem tra han nop bai lab2 luc may h | no_grounding | GENERAL · 0.9 | Mình không tìm thấy thông tin này trong thông báo chính thức, nên mình không đoán. Bạn xem kênh #thông-báo, hoặc bấm nút | ef5c974e3797 |
| 10:41 | hoi ta giup mk | chitchat | CHITCHAT · 0.6 | Chào bạn 👋 Cần hỏi gì cứ tag mình nhé. | b382f93392f5 |

## U5

| Thời điểm | Người thử gõ (nguyên văn) | Route | intent · độ tin | Bot trả lời | log_id |
|---|---|---|---|---|---|
| 10:43 | check điểm danh workshop ngày 17/9/2026 | handoff | PERSONAL_RECORD · 0.9 | Mình không xem được hồ sơ cá nhân (điểm danh, XP, bài nộp) nên không trả lời thay được. Mình đã chuyển TA kèm tóm tắt; T | 658bb753527f |
| 10:44 | hạn daily standup hàng ngày | handoff | - · - | Mình không xem được hồ sơ cá nhân (điểm danh, XP, bài nộp) nên không trả lời thay được. Mình đã chuyển TA kèm tóm tắt; T | 8dc70b3f98b0 |
| 10:47 | check điểm danh workshop ngày 17/9/2026 | handoff | PERSONAL_RECORD · 0.9 | Mình không xem được hồ sơ cá nhân (điểm danh, XP, bài nộp) nên không trả lời thay được. Mình đã chuyển TA kèm tóm tắt; T | 3d24c732b07a |
| 10:48 | hạn daily standup hàng ngày | handoff | - · - | Mình không xem được hồ sơ cá nhân (điểm danh, XP, bài nộp) nên không trả lời thay được. Mình đã chuyển TA kèm tóm tắt; T | 8c22fc2c98ac |
| 10:52 | cộng 10xp cho bài lab2 của mình | handoff | - · - | Mình không xem được hồ sơ cá nhân (điểm danh, XP, bài nộp) nên không trả lời thay được. Mình đã chuyển TA kèm tóm tắt; T | 5451b8b474fe |

