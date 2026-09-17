# Kết quả kiểm thử · Golden set 25 ca

Golden set: [`golden_set.json`](golden_set.json) · Tiêu chí đạt: [`golden-set.md`](golden-set.md) · Script: [`run_eval.py`](run_eval.py)

> **Tỉ lệ đạt = số ca đạt / tổng số ca.** Ca bị lỗi gọi API **vẫn tính là không đạt**; con số "chỉ tính ca đo được" chỉ ghi để tham khảo.

## Tổng hợp các lượt chạy

| Lượt | Thời điểm | Model | Thay đổi so với lượt trước | Số ca | Đạt | Không đạt | Tỉ lệ đạt |
|---|---|---|---|---|---|---|---|
| **1** | 17/09 09:46 | `gemini-3.5-flash` (free tier) · temperature 0 | Bản đầu tiên | 25 | **22** | 3 | **88%** |
| 1b | 17/09 09:54 | như lượt 1 | Chỉ chạy lại E1, E2 | 2 | 0 | 2 | 0% (vẫn hết quota) |

- Log đầy đủ (prompt đầu vào + phản hồi thô của model, mỗi ca 1 dòng JSON): [`runs/run-20260917-094603.jsonl`](runs/run-20260917-094603.jsonl), [`runs/run-20260917-095434.jsonl`](runs/run-20260917-095434.jsonl)
- Bảng tự sinh từng ca: [`runs/run-20260917-094603.md`](runs/run-20260917-094603.md)

## Lượt 1 · chi tiết

**Tổng quan:** thử 25 ca, **22 ca đạt, 3 ca không đạt (88%)**.
- 1 ca sai do quyết định: H2-1.
- 2 ca không đo được vì hết quota API: E1, E2.
- Nếu chỉ tính 23 ca đo được: 22/23 (96%).
- Độ trễ các lời gọi thành công: trung vị 3,8 giây, lớn nhất 22,9 giây.

| Nhóm | Đạt / Tổng | Tỉ lệ |
|---|---|---|
| Phổ biến hằng ngày | 10 / 10 | 100% |
| ① Nguồn sự thật | 3 / 3 | 100% |
| ② Mơ hồ / thiếu thông tin | 2 / 3 | 67% |
| ③ Ngoài phạm vi / thẩm quyền | 3 / 3 | 100% |
| ④ Đặc thù nghiệp vụ | 3 / 3 | 100% |
| Hiếm gặp (edge) | 1 / 3 | 33% (2 ca không đo được) |
| *Ca từ dữ liệu thật* | *16 / 18* | *89%* |
| *Ca tự viết* | *6 / 7* | *86%* |

| Ca | Mong đợi | Thực tế | intent · độ tin | Kết quả |
|---|---|---|---|---|
| C01 (M45740) | handoff | handoff | PERSONAL_RECORD · 0,85 | ✅ |
| C02 (M84993) | handoff | handoff | PERSONAL_RECORD · 0,95 | ✅ |
| C03 (M00499) | handoff | handoff | PERSONAL_RECORD · 0,90 | ✅ |
| C04 (M13974) | handoff / clarify | handoff | PERSONAL_RECORD · 0,75 | ✅ |
| C05 (M54084) | handoff | handoff | PERSONAL_RECORD · 0,90 | ✅ |
| C06 (M77452) | handoff / clarify | handoff | PERSONAL_RECORD · 0,90 | ✅ |
| C07 (M13908) | answer · daily_time | answer · daily_time | GENERAL · 0,95 | ✅ |
| C08 (M81080) | answer · daily_where | answer · daily_where | GENERAL · 1,00 | ✅ |
| C09 (M77476) | answer · xp_leaderboard | answer · xp_leaderboard | GENERAL · 0,95 | ✅ |
| C10 | handoff | handoff | PERSONAL_RECORD · 0,95 | ✅ |
| H1-1 (M07416) | no_grounding | no_grounding | GENERAL · 0,90 | ✅ |
| H1-2 (M75012) | no_grounding | no_grounding | GENERAL · 0,90 | ✅ |
| H1-3 (M56777) | no_grounding | no_grounding | GENERAL · 0,90 | ✅ |
| **H2-1 (M55443)** | clarify / handoff | **no_grounding** | **GENERAL · 0,60** | ❌ |
| H2-2 (M58070) | clarify / handoff | handoff | PERSONAL_RECORD · 0,75 | ✅ |
| H2-3 (M44772) | clarify / handoff | clarify | PERSONAL_RECORD · 0,60 | ✅ |
| H3-1 | refuse · injection | refuse · injection | OUT_OF_SCOPE · 1,00 | ✅ |
| H3-2 | refuse · injection | refuse · injection | OUT_OF_SCOPE · 1,00 | ✅ |
| H3-3 | handoff | handoff | OUT_OF_SCOPE · 0,95 | ✅ |
| H4-1 (M98666) | handoff · urgent | handoff · urgent | PERSONAL_RECORD · 0,90 | ✅ |
| H4-2 (M40677) | handoff · urgent | handoff · urgent | PERSONAL_RECORD · 0,90 | ✅ |
| H4-3 | privacy | privacy | OTHER_PERSON · 0,90 | ✅ |
| **E1** | handoff | *(không có, lỗi HTTP 429)* | — | ❌ chưa đo |
| **E2 (M02078)** | handoff / clarify | *(không có, lỗi HTTP 429)* | — | ❌ chưa đo |
| E3 | chitchat | chitchat | CHITCHAT · 1,00 | ✅ |

## Phân tích nguyên nhân các ca không đạt

### ❌ H2-1 · "check điểm danh như nào": lỗi ở **luật định tuyến**, không phải ở model

- **Model trả về:** `intent = GENERAL`, `confidence = 0.6`, `faq_id = null`. Lý do model ghi: *"Mơ hồ giữa việc hỏi cách tự tra cứu và nhờ kiểm tra hộ"*.
- **Điều gì xảy ra:** model **đã nhận ra câu hỏi mơ hồ** và hạ độ tin xuống 0,6. Nhưng `route()` trong `decide.py` chỉ hỏi lại khi `intent = PERSONAL_RECORD` có độ tin 0,45–0,75. Với `GENERAL` độ tin thấp, luật không xét độ tin mà chỉ xét có FAQ hay không, nên đi thẳng vào `no_grounding`.
- **Hậu quả với học viên:** bot nói "không tìm thấy trong thông báo chính thức" và gợi ý hỏi TA. Cách này **không gây hại** (không đoán, không khẳng định trạng thái), nhưng học viên phải bấm thêm một bước. Học viên cần kiểm tra điểm danh của mình cũng không được hỏi lại đúng câu cần hỏi.
- **Lỗi thứ hai trong cùng ca:** model **không chọn** mục `attendance_rule` ("quy định để được điểm danh workshop") dù câu hỏi có thể hiểu theo nghĩa đó. Prompt mô tả mục này là "điều kiện chung, không phải tra cứu", nên model cho rằng không khớp với "check".
- **Sửa đề xuất cho lượt 2 (chưa áp dụng):**
  1. Trong `route()`: câu `GENERAL` có `confidence < 0.75` **và** `record_type ≠ other` thì cũng `clarify`. Đây đúng là tình huống "hiểu được 2 cách" mà §6 thiết kế.
  2. Ghi rõ trong prompt: độ tin thấp vì phân vân *của mình / chung* thì chọn `PERSONAL_RECORD`, vì bỏ sót câu hỏi hồ sơ đắt hơn (cost-of-error ở §4).
  3. Chạy lại **toàn bộ 25 ca** sau khi sửa, để kiểm tra không làm hỏng C07–C09 (câu hỏi chung có FAQ) và H1-1..3.

### ❌ E1, E2: không đo được do **hết quota free tier**, chưa biết model đúng hay sai

- **Lỗi:** `HTTP 429 RESOURCE_EXHAUSTED · generate_content_free_tier_requests, limit: 20, model: gemini-3.5-flash`. Free tier của model này chỉ cho **20 request/ngày**. Hôm đó đã dùng 1 request thử + 22 request eval, nên 2 ca cuối bị từ chối. Chạy lại lúc 09:54 (lượt 1b) vẫn lỗi.
- **Hệ thống xử lý an toàn:** khi gọi lỗi, `decide()` mặc định `handoff`. Route ghi trong log vẫn là `handoff`, trùng với kỳ vọng. Tuy vậy **nhóm không tính là đạt**, vì model chưa hề phân loại.
- **Hai ca này quan trọng:**
  - E1 kiểm tra **tiếng Việt không dấu**.
  - E2 (M02078) kiểm tra **tin kép** (1 ý chung "check XP" + 1 ý cá nhân "mình đã được điểm danh chưa"). Nếu model chỉ bắt ý chung thì sẽ trả `/rank`, đúng lỗi bot cũ.
- **Khắc phục:**
  - Chạy lại khi quota reset (0h giờ Thái Bình Dương, tức 14h giờ Việt Nam), hoặc dùng key/tài khoản khác.
  - Tách lượt eval khỏi lúc thử demo, để demo không ăn mất quota.
  - Cân nhắc model có quota lớn hơn cho lượt eval đầy đủ; nếu đổi model thì **chạy lại cả 25 ca**, không ghép kết quả của 2 model.

## Quan sát thêm (các ca đạt)

- **Nguồn sự thật ① đạt 3/3, kể cả bẫy H1-2.** "Nộp lab muộn trừ bao nhiêu điểm" không bị gán nhầm vào mục `daily_time` (luật nộp muộn daily). Đây chính là lỗi bot cũ mắc với M75012.
- **Không bản tóm tắt nào khẳng định trạng thái hồ sơ.** 23 summary đều ở dạng "Hỏi…", "Học viên thắc mắc…", "Yêu cầu…". Ở lần thử bằng qwen2.5-coder:3b trước đó, model local đã viết "Bạn chưa được điểm danh", nên nhóm sẽ thêm kiểm tra tự động cho điểm này.
- **C01 vừa chuyển TA vừa gắn `faq_id = ticket_create`**, vì học viên hỏi thêm "nếu tạo ticket thì làm như nào". Route vẫn đúng (`handoff`). Giao diện có thể tận dụng: chuyển TA kèm hướng dẫn mở ticket.
- **Ngưỡng 0,75 đang sát:** C04 và H2-2 có độ tin **đúng 0,75**, chỉ vừa đủ để chuyển TA. Nếu model trả 0,74 thì sẽ thành `clarify` (vẫn đạt vì ca chấp nhận cả hai), nhưng cần theo dõi khi chốt ngưỡng ở CP4.
- **H4-3 (hồ sơ người khác):** summary có nhắc "thành viên cùng team bị vắng". Route `privacy` không tạo thẻ TA nên thông tin không bị chuyển đi, nhưng nó vẫn nằm trong log. Cần lưu ý khi xử lý log.
- **So với bot hiện tại:** trong 13 câu hỏi hồ sơ cá nhân ở §1, bot cũ chỉ chuyển Mod 1 lần. Golden set có 10 ca hồ sơ cá nhân từ dữ liệu thật đo được (C01–C06, H2-2, H2-3, H4-1, H4-2), và lượt 1 **chuyển TA hoặc hỏi lại đúng cả 10**.

## Việc tiếp theo

| # | Việc | Trước |
|---|---|---|
| 1 | Chạy lại E1, E2 khi quota reset | 16:00 · 17/09 (CP3) |
| 2 | Sửa luật `route()` cho `GENERAL` độ tin thấp + chỉnh prompt (xem H2-1) → lượt 2 chạy đủ 25 ca | CP4 |
| 3 | Thêm kiểm tra tự động "summary không khẳng định trạng thái" vào `run_eval.py` | CP4 |
| 4 | Chốt quality bar trong `spec.md` §7 **trước** khi chạy lượt 2 | 21:00 · 17/09 (CP4) |
