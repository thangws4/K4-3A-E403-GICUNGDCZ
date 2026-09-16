# AI SPEC — [Tên lát cắt] · Nhóm [GICUNGDCZ] · Zone [B]
Hướng: [ ] A — VLearn  [X] B — Trợ lý Học viên  [ ] C — Làn mở
Loại: [X] Tối ưu tính năng có sẵn  [ ] Tính năng mới

## §1. User & Job
- **Job executor + workflow** *(worksheet JTBD: chưa đính kèm)*:
  - **Job executor:** học viên khoá 4 đang trong Build Phase. Điểm danh workshop, XP và điểm lab tính vào kết quả khoá học, nên họ theo dõi sát.
  - **Workflow:**
    1. Tham gia workshop / nộp daily standup / nộp lab
    2. Không thấy dấu hiệu được ghi nhận, hoặc biết mình đã làm sai (đặt tên Zoom sai, bị chặn khi nộp)
    3. Tìm cách tự kiểm tra
    4. Không tự kiểm tra được thì hỏi trên Discord: tag bot, hỏi kênh chung, mở ticket
    5. Nhận xác nhận trạng thái, hoặc được người có quyền sửa
    6. Yên tâm, hoặc khắc phục trước khi mất điểm

  Chỗ đứt gãy nằm ở bước 4→5: câu hỏi không đến được người có quyền tra hồ sơ.
- **Core JTBD:** *Khi nghi mình chưa được ghi nhận điểm danh, XP hay bài nộp, tôi muốn biết chắc trạng thái của mình và ai sửa được, để khắc phục kịp trước khi mất điểm.*
- **Problem statement:** Trên Discord, học viên hỏi trợ lý tự động về trạng thái điểm danh/XP/bài nộp **của chính mình**. Trong 12/13 trường hợp, họ nhận câu trả lời soạn sẵn lạc đề, bị bắt chọn menu, hoặc nhận lời giải thích dài mang tính phỏng đoán; câu hỏi không được chuyển tới TA/Mod, những người duy nhất tra được hồ sơ. Học viên không biết mình có bị mất điểm hay không, và 4/13 người phải hỏi lại trong vòng 30 phút.
- **Evidence (chuẩn B: mining `data/discord-track/k4_messages.csv`, 1.092 tin, 12–14/09/2026):**
  - **Số liệu mining:**
    - **Cách đếm (kiểm lại được):**
      1. Tin của người có tag bot (`is_bot=False`, `mentions_bot=True`) → **307 tin / 120 người**.
      2. Lọc từ khoá: đại từ ngôi thứ nhất (*mình, tôi, em, tớ, t*) **và** từ về hồ sơ (*điểm danh, vắng, XP, điểm, nộp, muộn, bị chặn, quyền…*) → 25 tin.
      3. Đọc tay, chỉ giữ câu hỏi về dữ liệu **của riêng người hỏi** mà chỉ TA/hệ thống tra được → 12 tin. Thêm M44772 ("miss điểm danh", câu này thiếu đại từ nên lọt bước 2) → **n = 13 tin, 13 người khác nhau**.
    - **Phân bố theo ngày:** 12/09: 5 · 13/09: 3 · 14/09: 5. Câu hỏi xuất hiện đều sau các sự kiện workshop/nộp bài, không dồn vào một ngày onboarding.
    - **Bot trả lời 13 tin đó như sau:**

      | Kiểu trả lời | Số tin | msg_id |
      |---|---|---|
      | Câu soạn sẵn lạc đề, không nói gì về trạng thái | 6 | M05936, M44772, M45740, M73901, M02078, M84993 |
      | Giải thích dài / phỏng đoán, không chuyển người | 4 | M13974 (955 ký tự), M40677 (738), M77452 (1.179), M54084 (1.192) |
      | Hỏi lại bằng menu dù câu hỏi đã rõ | 2 | M58070, M00499 |
      | **Tag Mod, đúng hành vi mong muốn** | **1** | M98666 |

    - Cơ chế tag Mod (`[@role]`) **đã có sẵn** trong bot, dùng 7/307 lần trên toàn pack, nhưng chỉ 1/13 lần với câu hỏi hồ sơ cá nhân.
    - **Bằng chứng từ bản tin bot** (`k4_daily_reports.md`, K4-L3-4 gửi 13/09): các ca "sửa điểm danh", "lịch sử điểm danh không hiển thị", "gửi mail IT kiểm tra điểm danh" bị gom vào **"câu hỏi chưa rõ"**, nên TA đọc bản tin cũng không biết ai cần được kiểm tra.
    - **Giới hạn:**
      - n = 13 là **số tối thiểu**: pack chỉ có kênh public trong 3 ngày; DM, ticket và 8 tin hoàn cảnh cá nhân đã bị loại.
      - Các câu mơ hồ như M55443 "check điểm danh như nào" không được tính.
      - Không phân biệt được TA với học viên. Pack chỉ lưu reply trực tiếp.
      - **Chưa có khảo sát (chuẩn A):** chưa xác nhận được học viên có thực sự mất điểm hay không. Việc cần làm: phỏng vấn ≥3 bạn theo Mom Test, lưu log ở `validation/survey-pain.md`.
  - **≥5 ví dụ nguyên văn + nguồn** *(trích ≤2 câu)*:
    1. **M45740:** *"mình đặt sai cú pháp khi tham gia zoom workshop nên không được ghi nhận, mình nên xử lí như nào"*
       - Bot: *"Tham gia workshop đăng nhập Zoom với đúng email đã đăng ký với chương trình và đặt tên đúng cú pháp sẽ được điểm danh tự động nhé."*
       - Học viên đã sai và cần cách khắc phục; bot nhắc lại đúng quy tắc họ đã lỡ vi phạm.
    2. **M84993:** *"check xem t đã nộp bài codelab chưa"*
       - Bot: *"Bài Lab trên lớp sẽ được chấm sau khi hết deadline thường là 23:59 cùng ngày nhé"*
       - Hỏi trạng thái nộp nhưng nhận giờ chấm bài, kèm deadline "thường là", tức là đoán.
    3. **M73901:** *"mình muốn kiểm tra lịch sử điểm danh thì xem ở đâu"*
       - Bot: *"Các bạn có thể theo dõi hoặc tìm kiếm điểm XP của mình bằng Discord ID…"*
       - Hỏi về điểm danh, nhận câu trả lời về XP.
    4. **M58070:** *"làm thế nào để tôi biết là tôi đã điểm danh"*
       - Bot: *"Bạn muốn kiểm tra việc điểm danh trong ngữ cảnh nào?"* kèm menu 3 lựa chọn.
    5. **M00499:** *"hôm qua có workshop mà chưa thấy hệ thống cộng điểm XP."*
       - Học viên liệt kê 3 ca thiếu XP; bot đáp *"Bạn muốn hỏi về việc cộng điểm XP cho hoạt động nào?"* và không ca nào được chuyển cho người kiểm tra.
    6. **M77452:** *"có thể tra cứu mình đã điểm danh những hôm nào không bạn"*
       - Bot trả lời 1.179 ký tự, tự nghĩ ra cách suy ngày điểm danh qua lịch sử XP của `/rank`.
    7. **M98666 (đối chứng):** *"hôm qua mình gửi sớm daily standup thì không được, chiều nay quá deadline thì nó lại blocked mình."*
       - Bot: *"Mình chưa rõ thông tin câu này lắm, để chắc chắn không sai sót thì mình nhờ Mod vào trả lời giúp bạn ạ!"*
       - Đây là hành vi mong muốn, nhưng chỉ xảy ra 1/13 lần.

## §2. Impact & quyết định chọn
- **Bảng impact ≥3 ứng viên** *(cùng nguồn và phương pháp: tin gửi bot, lọc theo từ khoá chủ đề; "hỏi lại" = cùng người tag bot lần nữa trong cùng kênh trong vòng 30 phút)*:

  | Ứng viên | Bao nhiêu người | Tần suất (12/09 · 13/09 · 14/09) | Tốn gì mỗi lần | Khả thi |
  |---|---|---|---|---|
  | **① Câu hỏi hồ sơ cá nhân → chuyển TA** | 13 tin / 13 người | 5 · 3 · 5, đều theo sự kiện | Rủi ro **mất điểm danh/XP/điểm lab**. Bot xử lý sai 12/13. 4/13 hỏi lại trong 30' | **Cao:** 1 quyết định (cá nhân hay không → trả lời hay chuyển TA). Không cần nguồn dữ liệu nào bot chưa có. Cơ chế tag Mod đã có sẵn |
  | ② Logistics daily standup | 60 tin / 32 người | 4 · 8 · 48, tăng mạnh | Mất XP daily. 20/60 bị menu, 34/60 hỏi lại trong 30' | **Trung bình:** cần luật standup chính thức, mà dữ liệu đang mâu thuẫn ("nộp muộn vẫn ghi nhận" vs M98666, M82163 bị chặn) |
  | ③ Lập team / chọn đề tài | 89 tin / 55 người | 5 · 26 · 58 | Chậm lập team. 17/89 bị menu, 35/89 hỏi lại trong 30' | **Thấp:** câu hỏi rất đa dạng, nhiều quy định BTC chưa công bố (bot tự nói không có thông tin, ví dụ M56777) |
  | ④ Hạn nộp / nộp muộn lab | 5 tin / 5 người | 1 · 2 · 2 | Mất điểm lab. Bot trả lời dài (trung vị 738 ký tự). M75012 hỏi lab muộn thì nhận luật daily standup | **Thấp:** n quá nhỏ để làm golden set; cần lịch deadline chính thức mà pack không có |
  | ⑤ Bot hỏi lại bằng menu (mọi chủ đề) | 63 tin / 46 người | 9 · 18 · 36 | 39/63 hỏi lại trong 30' | Trung bình, nhưng đây là **hành vi của bot** chứ không phải job của một user, nên không thành lát cắt "1 user · 1 việc" |

- **Ứng viên ĐÃ LOẠI + vì sao:**
  - **② Standup:** nhiều người nhất (32 người, 48 tin chỉ trong 14/09). Nhưng chấm đúng/sai **phụ thuộc luật chính thức đang mâu thuẫn ngay trong dữ liệu**, nên chưa thể dựng golden set có đáp án chắc chắn trước CP4. Hậu quả mỗi lần cũng nhẹ hơn: nộp muộn vẫn được ghi nhận, chỉ mất XP ngày đó.
  - **③ Team/đề tài:** 89 tin nhưng trải trên hàng chục loại câu hỏi khác nhau, và phần lớn đáp án nằm trong thông báo BTC mà pack không có. Lát cắt sẽ quá rộng với nhóm 3-4 người.
  - **④ Deadline lab:** hậu quả nặng nhưng chỉ 5 tin, và cần lịch deadline chính thức mà nhóm chưa có.
  - **⑤ Menu hỏi lại:** là triệu chứng xuyên suốt nhiều chủ đề. Sẽ xử lý như một **ràng buộc thiết kế** trong ①: không hỏi lại bằng menu khi câu hỏi cá nhân đã rõ.
- **Ứng viên CHỌN: ① Câu hỏi hồ sơ cá nhân → chuyển TA. Vì sao (bằng số):**
  1. **Tỉ lệ bot xử lý sai cao nhất:** 12/13 (92%) câu không đến được người có quyền. So với 20/60 (33%) bị menu ở ② và 17/89 (19%) ở ③.
  2. **Hậu quả mỗi lần nặng nhất:** 13/13 câu liên quan trực tiếp tới điểm danh, XP hoặc bài nộp, tức kết quả khoá học. Trong đó 6/13 bot trả lời lạc đề, nghĩa là học viên có thể yên tâm sai.
  3. **Rộng, không phải một người hỏi lặp:** 13 câu đến từ 13 người khác nhau, trải đều cả 3 ngày (5 · 3 · 5). Loại câu hỏi này sẽ lặp lại sau mỗi workshop và mỗi hạn nộp trong 6 tuần, không chỉ trong tuần onboarding.
  4. **Khả thi nhất để đo:** đáp án đúng **không phụ thuộc nguồn chính thức nào đang thiếu**. Chỉ cần phân loại "cá nhân / không cá nhân" rồi chuyển TA. Golden set ghép được từ 13 ca thật (positive) và các câu không cá nhân trong 307 tin (negative, để đo chuyển TA nhầm).
  5. **Chênh lệch nhỏ nhất so với hành vi mong muốn:** bot đã tag Mod được (7 lần trong pack), chỉ chưa nhận ra đúng lúc. Rủi ro kỹ thuật thấp, nên nhóm tập trung được vào đo lường.
  - **Đánh đổi thừa nhận:** số lượng ① nhỏ hơn ② 4,6 lần và nhỏ hơn ③ 6,8 lần. Nhóm chọn ① vì **mức độ nặng và tỉ lệ sai**, không vì số lượng. Cần khảo sát (§1, chuẩn A) để xác nhận hậu quả mất điểm là thật.

## §3. Giải pháp tương tự đã nghiên cứu
- [Sản phẩm 1]: flow / đáng học / đáng né / mình khác gì
- [Sản phẩm 2]: ...

## §4. Thiết kế
- Lát cắt MỘT CÂU (1 user · 1 việc · 1 quyết định AI · 1 kết quả):
- Non-goals (≥3 thứ KHÔNG build):
- Mức prototype nhắm tới: [ ] Sketch [ ] Mock [ ] Working — phần nào mock, phần nào thật:
- Automation: [ ] augment [ ] conditional [ ] automate — lý do theo cost-of-error:
- §4b. Nguyên tắc đã áp dụng (≥4 — HAX/PAIR, xem guide):
  | Nguyên tắc | Áp cụ thể vào đâu trong prototype |
  |---|---|

## §5. Kiểu lỗi — 4 lớp chỗ khó + kịch bản (≥8) [bảng theo guide §2.5]

## §6. Bốn đường đi của trải nghiệm
- Happy path: · Low-confidence (②): · Failure/không căn cứ (①): · Correction (user sửa):
- Khi bị đòi ngoài phạm vi (③): · Case đặc thù domain (④):

## §7. Kiểm thử
- Chiều chất lượng + định nghĩa kiểm chứng được:
- Golden set (≥20 case theo cơ cấu trong guide §2.6, file trong eval/):
- Quality bar (chốt từ hạn chốt spec của khoá, giữ nguyên sau đó): "Đạt khi ≥ ___% qua bộ, và ___"
- Kết quả các lượt chạy (bảng % — cập nhật đến trước CP6):

## §8. Phân công & kế hoạch
- Phân công có tên: spec / evidence / prompt / code / demo
- Willing users (≥2 tên) + kế hoạch vòng validation *(bonus, nếu làm)*:
- Multi-prototype (nếu làm): trục khác biệt của ≥2 phương án + lý do chọn:

## §9. Changelog
| Thời điểm | Đổi gì | Vì sao (trỏ về feedback/case nào) |