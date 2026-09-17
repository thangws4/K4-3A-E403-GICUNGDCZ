# Sơ đồ luồng · Trợ lý chuyển TA câu hỏi hồ sơ cá nhân

Bản mẫu bấm được: [`index.html`](index.html) (mở trực tiếp bằng trình duyệt). Số ①②③④ khớp với `spec.md` §6.

```mermaid
flowchart TD
    A([Học viên tag bot]) --> B{{"Quyết định AI: phân loại intent + độ tin<br/>(CP2: luật từ khoá · CP3: 1 lời gọi LLM)"}}

    B -->|"Tin chứa chỉ dẫn cho bot"| INJ["③ Không làm theo, không xác nhận hồ sơ<br/>nút: Chuyển TA kiểm tra"]
    B -->|"Đòi sửa / cộng hồ sơ"| ACT["③ Nói rõ bot không sửa được"]
    B -->|"Hồ sơ của người khác"| PRIV["④ Từ chối, không chuyển TA<br/>nút: Thực ra là hồ sơ của mình"]
    B -->|"PERSONAL, độ tin ≥ 0,75"| H
    B -->|"PERSONAL, 0,45–0,75"| LOW["② Hỏi lại đúng 1 câu, 2 nút"]
    B -->|"GENERAL"| G{"Có trong nguồn<br/>chính thức?"}
    B -->|"Chào hỏi"| CH([Đáp 1 dòng])

    LOW -->|"Trường hợp của mình"| H
    LOW -->|"Quy định chung"| G
    G -->|Có| ANS["Trả lời ngắn + ghi nguồn"]
    G -->|Không| FAIL["① Không tìm thấy, không đoán<br/>nút: Hỏi TA giúp mình"]
    FAIL -->|bấm| H
    ANS -->|"Không đúng ý"| H
    INJ -->|bấm| H
    ACT --> H
    PRIV -->|bấm| H

    H["Happy path: 1 câu 'mình không xem được hồ sơ'<br/>+ tạo thẻ TA kèm tóm tắt · gắn cờ Gấp nếu sát hạn nộp"]

    H --> U{Học viên}
    U -->|"Sửa tóm tắt"| UPD["Cập nhật thẻ TA"] --> LOG
    U -->|"Bot hiểu sai"| RE["Huỷ thẻ"] --> LOG
    RE --> G
    U -->|"Không cần chuyển TA"| X["Huỷ thẻ · nút Gửi lại"]

    H --> T{TA}
    T -->|"Trả lời học viên"| END([Học viên nhận trạng thái từ TA])
    T -->|"Không phải hồ sơ cá nhân"| RE2["Đóng thẻ"] --> LOG
    RE2 --> G

    LOG[("Nhật ký sửa sai → case mới trong eval/")]
```

## Điểm gọi quyết định AI

| # | Chỗ gọi | Đầu vào | Đầu ra | Ai quyết định cuối |
|---|---|---|---|---|
| 1 | Khi học viên tag bot | Nội dung tin nhắn (coi là **dữ liệu**, không phải lệnh) | `intent`, `confidence`, `record_type`, `urgent`, `injection`, `summary`, `reasons` | Bot tự định tuyến theo ngưỡng |
| 2 | Tra nguồn chính thức (chỉ với GENERAL) | Câu hỏi + FAQ/thông báo | Đoạn trả lời + nguồn, hoặc "không tìm thấy" | Bot, nhưng **không có nguồn thì không trả lời** |
| — | Trạng thái hồ sơ cá nhân | — | — | **Chỉ TA**; AI không bao giờ khẳng định |
