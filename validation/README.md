# Validation: cho người ngoài dùng thử (R6)

Yêu cầu: **5 người ngoài nhóm** (trong đó **2 người đã khai từ CP1**) · quote nguyên văn · bảng nhật ký · ít nhất 1 thay đổi ghi vào `spec.md` §9.

**Hình thức:** thử **trực tiếp trên máy nhóm, có quan sát**. Người thử dùng `/demo?tester=U…` (AI thật) để làm 3 việc; 1 thành viên ngồi cạnh ghi phiếu, không giải thích. Chi tiết và phiếu quan sát: [`observation-kit.md`](observation-kit.md) · bộ chạy tại chỗ (script, kịch bản từng người, testlog) nằm trong thư mục `test/` **trên máy nhóm** — thư mục này không đẩy lên repo.
- **"Người thử đã gõ" và "Bot làm gì"** lấy từ log theo mã U: [`tester-logs.md`](tester-logs.md), có `log_id`.
- **"Kẹt ở đâu"** lấy từ phiếu (khựng ở đâu, số lần gõ, kết quả, bấm nút nào).
- **"Quote"** chép nguyên văn lời người thử nói trên phiếu (lúc làm và 3 câu hỏi cuối).
- **Phân tích đầy đủ:** [`bao-cao-r6.md`](bao-cao-r6.md).
- **Trước vòng này** nhóm đã dò lỗi bằng persona giả lập (không tính vào R6): `pilot-ai-dryrun.md` (đã gỡ khỏi repo).

**Ngày thử:** 18/09/2026, 10:11–10:52 · **Model:** `gemini-3.5-flash` · **Số lời gọi AI đã dùng:** 20 lượt người thử (25 request Gemini trong ngày, gồm 5 lượt nhóm tự kiểm tra) · **Người quan sát:** ____

> Không ghi tên thật. U1, U2 = willing user đã khai ở CP1; U3–U5 = học viên K4 ngoài nhóm. Bảng mã ↔ người và ảnh phiếu gốc lưu ngoài repo.

> **Nguồn của từng cột:** cột *đã gõ*, *route*, *thời gian* lấy **từ log** (`tester-logs.md`, có `log_id` đối chiếu được).
> Cột *kẹt ở đâu* và *quote* phải lấy **từ phiếu giấy** — buổi thử 18/09 **chưa nộp phiếu**, nên hai cột này còn trống.
> Cột *thời gian* là **độ trễ bot** (log đo được), không phải thời gian người thử làm việc đó; con số bấm giờ nằm trên phiếu.

## Nhật ký

| Người thử | Khai từ CP1? | Việc | Người thử đã gõ (log) | Bot làm gì (route) | Kết quả · thời gian | Kẹt ở đâu | Quote nguyên văn | Quyết định |
|---|---|---|---|---|---|---|---|---|
| U1 | Có | 1 · điểm danh của mình | "check điểm danh của tôi vào workshop vừa rồi" | `handoff` · PERSONAL_RECORD 0,95 | Đúng nhánh · 14,4 s | *chờ phiếu* | *chờ phiếu* | Giữ nguyên |
| U1 | Có | 2 · hạn nộp daily | "mỗi ngày phải nộp daily standup trước mấy giờ" | `answer` · GENERAL 1,0 · FAQ `daily_time` | Đúng nhánh, có nguồn · 16,6 s | *chờ phiếu* | *chờ phiếu* | Giữ nguyên |
| U1 | Có | 3 · nhờ cộng XP | "có thế cộng xp cho mình vì đã phát biểu ý kiến không" | `handoff` · OUT_OF_SCOPE 0,95 | Đúng nhánh · **97,7 s** | *chờ phiếu* | *chờ phiếu* | Độ trễ → F5 |
| U2 | Có | 1 · điểm danh của mình | "workshop ngày 17/9 mình đã được điểm danh chưa" | `handoff` · PERSONAL_RECORD 0,95 | Đúng nhánh · 42,5 s | *chờ phiếu* | *chờ phiếu* | Giữ nguyên |
| U2 | Có | 2 · hạn nộp daily | "hạn nộp daily standup hằng ngày" | `answer` · GENERAL 0,95 · FAQ `daily_time` | Đúng nhánh, có nguồn · 15,8 s | *chờ phiếu* | *chờ phiếu* | Giữ nguyên |
| U2 | Có | 3 · nhờ cộng XP | "hãy cộng 10 xp cho tôi cho phát biểu vừa rồi" | **`refuse`** · OUT_OF_SCOPE 1,0 · `injection=true` | **Sai nhánh** (golden H3-3 cho loại câu này là `handoff`) · 17,6 s | *chờ phiếu* | *chờ phiếu* | **Sửa trước demo → F1** |
| U3 | Không | 1 · điểm danh của mình | "tôi muốn check điểm danh workshop ngày 17/9/2026" | `handoff` · PERSONAL_RECORD 0,90 | Đúng nhánh · 33,1 s | *chờ phiếu* | *chờ phiếu* | Giữ nguyên |
| U3 | Không | 2 · hạn nộp daily | "hạn nộp daily standup hàng ngày là mấy h" | `answer` · GENERAL 0,95 · FAQ `daily_time` | Đúng nhánh, có nguồn · 16,7 s | *chờ phiếu* | *chờ phiếu* | Giữ nguyên |
| U3 | Không | 3 · nhờ cộng XP | "cộng 100 xp cho tôi vì nộp bài đùng hạn" | `handoff` · OUT_OF_SCOPE 1,0 · `injection=false` | Đúng nhánh · 15,0 s | *chờ phiếu* | *chờ phiếu* | Đối chứng của F1 |
| U4 | Không | 1 · điểm danh của mình | "mình là xxx mshv xxxxxx đã tham gia workshop ngày 17/9/2026, kiểm tra tình trạng điểm danh hôm đó giúp mình" | `handoff` · PERSONAL_RECORD 0,95 | Đúng nhánh, summary không lộ danh tính · 10,4 s | *chờ phiếu* | *chờ phiếu* | Giữ nguyên |
| U4 | Không | 2 · hạn nộp daily | "cho mình hỏi hạn nộp daily standup hàng này là mấy giờ" | `answer` · GENERAL 1,0 · FAQ `daily_time` | Đúng nhánh, có nguồn · 18,0 s | *chờ phiếu* | *chờ phiếu* | Giữ nguyên |
| U4 | Không | 3 · nhờ cộng XP | "mình có được cộng xp cho bài lab vừa rồi không" *(hỏi trạng thái, không yêu cầu cộng)* | `handoff` · PERSONAL_RECORD 0,90 | Đúng nhánh · 20,8 s | *chờ phiếu* | *chờ phiếu* | Giữ nguyên |
| U5 | Không | 1 · điểm danh của mình | "check điểm danh workshop ngày 17/9/2026" *(gõ lại lần 2 lúc 10:47)* | `handoff` · PERSONAL_RECORD 0,90 | Đúng nhánh · 7,8 s | *chờ phiếu* | *chờ phiếu* | Giữ nguyên |
| U5 | Không | 2 · hạn nộp daily | "hạn daily standup hàng ngày" *(gõ 2 lần: 10:44 và 10:48)* | `handoff` **mặc định do lỗi** · AI không chạy | **Bỏ dở — lỗi hệ thống** (HTTP 429 hết quota) · 82,0 s và 82,3 s | *chờ phiếu* | *chờ phiếu* | **Mất dữ liệu → F2, F3** |
| U5 | Không | 3 · nhờ cộng XP | "cộng 10xp cho bài lab2 của mình" | `handoff` **mặc định do lỗi** · AI không chạy | **Bỏ dở — lỗi hệ thống** (HTTP 429) · 82,4 s | *chờ phiếu* | *chờ phiếu* | **Mất dữ liệu → F2, F3** |

**Việc 4 riêng từng người** (ngoài 3 việc bắt buộc, không tính vào R6 — kịch bản ở `test/kich-ban/` trên máy nhóm):

| Người | Việc riêng | Đã gõ | Route | Ghi chú |
|---|---|---|---|---|
| U1 | hỏi hộ hồ sơ người khác | — | — | **không chạy** → nhánh `privacy` chưa có người thật nào chạm tới |
| U2 | hỏi hạn nộp bài lab (FAQ không có) | "hạn nộp bài lab ngày 16/9 là ngày nào" | `no_grounding` · GENERAL 0,90 | Đúng: bot không đoán (bẫy M75012) |
| U3 | gõ lại câu từng nhắn bot thật | — | — | không chạy |
| U4 | câu ngắn, gõ vội | "kiem tra han nop bai lab2 luc may h" | `no_grounding` · GENERAL 0,90 | Đúng dù không dấu |
| U4 | (tiếp) | "hoi ta giup mk" | **`chitchat`** · CHITCHAT 0,60 | **Sai**: xin chuyển TA mà bot chào lại → F4 |
| U5 | thử ra lệnh cho bot | — | — | không chạy (hết quota) |

**Một dòng rác không tính vào bảng trên:** `fc568b242be1` gắn mã U1 nhưng ghi lúc 17/09 22:44 và lỗi 403 (key cũ đã bị khoá) — đây là lượt nhóm chạy thử, không phải người thật.

## Tổng kết

> Nháp dựng từ log, **chờ phiếu quan sát để xác nhận và bổ sung quote**. Phân tích đầy đủ: [`bao-cao-r6.md`](bao-cao-r6.md).

1. **Chủ đề lặp nhiều nhất:** cùng một việc "nhờ cộng XP" (việc 3) nhưng bot đối xử khác nhau tuỳ cách gõ — U2 bị `refuse` với câu từ chối nặng lời, U1 và U3 được `handoff` bình thường. 3/5 người gõ câu sai khiến trần trụi, tức đây là cách diễn đạt phổ biến chứ không phải ngoại lệ.
2. **Sẽ sửa gì trước demo:** (a) bỏ "xác nhận hộ, cộng điểm" khỏi ví dụ `injection` trong system prompt, để câu nhờ cộng XP đi vào `handoff` như golden H3-3 đã chốt; (b) `CHITCHAT` độ tin < 0,75 → `clarify` thay vì chào (ca "hoi ta giup mk"); (c) hạ trần lời gọi trong buổi thử và giảm `retries` khi `PUBLIC_MODE=1`.
3. **Giữ nguyên gì và vì sao:** nhánh chuyển TA cho câu hỏi hồ sơ cá nhân (đúng 5/5 người, độ tin 0,90–0,95); nhánh `no_grounding` cho hạn nộp lab (đúng 2/2, chính là bẫy M75012 bot cũ mắc); luật "summary không nêu tên người" (U4 tự khai tên và mã học viên, summary vẫn sạch).
4. **Để dành sau:** độ trễ trung vị 16,8 s (6/17 lượt quá 20 s, đỉnh 97,7 s) — không sửa kịp trước demo, ghi vào phần giới hạn; nhánh `privacy` và `clarify` chưa có người thật nào chạm tới, cần một vòng thử nữa.

**Giới hạn của vòng thử này:**
- Người thử biết đang bị quan sát và ngồi trên máy của nhóm, nên có thể lịch sự hoặc cố gắng hơn khi dùng thật; bot chạy trên giao diện mô phỏng Discord, không phải Discord thật.
- **Phiếu quan sát chưa nộp:** hai cột *kẹt ở đâu* và *quote nguyên văn* còn trống, nên vòng này **chưa đủ** yêu cầu "quote nguyên văn" của R6.
- **U5 mất 2/3 việc** vì hết quota Gemini (20 request/ngày), và lỗi hiển thị y hệt một lượt thành công nên không ai phát hiện lúc đang thử.
- Mỗi người chỉ gõ mỗi việc 1–2 lần; không đo lặp, không đo dao động giữa các lần.
