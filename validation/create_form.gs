/**
 * Tạo Google Form cho vòng dùng thử R6 (thử không đồng bộ) + Google Sheet nhận câu trả lời.
 * Phần lớn là câu hỏi lựa chọn; chỉ 1 ô tự viết (Q12) để lấy quote nguyên văn.
 * Câu người thử đã gõ KHÔNG hỏi lại: server đã lưu theo mã U1…U5 (validation/export_tester_logs.py).
 *
 * Cách chạy (khoảng 2 phút):
 *   1. Mở https://script.google.com → New project
 *   2. Xoá code mẫu, dán toàn bộ file này vào, bấm Save
 *   3. Chọn hàm createR6Form → Run → cấp quyền (Google Forms, Sheets) bằng tài khoản của nhóm
 *   4. Mở Execution log: có 3 link
 *        - LINK GỬI NGƯỜI THỬ   (dán vào tin nhắn mời thay <link Google Form>)
 *        - LINK SỬA FORM        (chỉ nhóm dùng)
 *        - LINK SHEET KẾT QUẢ   (File → Download → CSV để gửi lại, lưu ngoài repo)
 *
 * Nội dung khớp validation/async-test-kit.md mục 3. Form không thu email hay tên.
 */
function createR6Form() {
  const form = FormApp.create('Dùng thử Trợ lý Discord · Nhóm GICUNGDCZ');
  form
    .setDescription(
      'Form ẩn danh, khoảng 3 phút. Chọn đáp án gần nhất với những gì ĐÃ xảy ra khi bạn dùng thử, ' +
      'kể cả khi bot làm bạn khó hiểu hay không vừa ý. Nhóm cần nhất là những chỗ đó.\n\n' +
      'Làm 3 việc trên trang demo trước, rồi mới điền form này. Nhóm đã tự lưu câu bạn gõ theo mã U, ' +
      'nên bạn không cần chép lại.')
    .setCollectEmail(false)
    .setAllowResponseEdits(false)
    .setProgressBar(true)
    .setShowLinkToRespondAgain(false)
    .setConfirmationMessage('Cảm ơn bạn đã giúp nhóm GICUNGDCZ!');

  const choice = (title, options, required = true, other = false) => {
    const item = form.addMultipleChoiceItem().setTitle(title).setChoiceValues(options).setRequired(required);
    if (other) item.showOtherOption(true);
    return item;
  };
  const checkbox = (title, options, required = false, other = true) => {
    const item = form.addCheckboxItem().setTitle(title).setChoiceValues(options).setRequired(required);
    if (other) item.showOtherOption(true);
    return item;
  };

  // ---- Q1–Q2 · Thông tin chung
  form.addListItem()
    .setTitle('Q1. Mã người thử của bạn (trong tin nhắn mời)')
    .setChoiceValues(['U1', 'U2', 'U3', 'U4', 'U5'])
    .setRequired(true);
  choice('Q2. Bạn dùng thử bằng thiết bị nào?', ['Điện thoại', 'Máy tính']);

  // ---- Q3–Q6 · Việc 1
  form.addPageBreakItem()
    .setTitle('Việc 1: hỏi điểm danh của bạn')
    .setHelpText('Bạn đã hỏi bot xem buổi workshop gần nhất BẠN đã được điểm danh chưa.');

  choice('Q3. Bot đã làm gì với câu hỏi của bạn?', [
    'Trả lời luôn là mình đã được / chưa được điểm danh',
    'Giải thích quy định điểm danh chung (cách để được điểm danh)',
    'Nói không xem được hồ sơ của mình và chuyển cho TA / Mod',
    'Hỏi lại: mình muốn kiểm tra trường hợp của mình hay hỏi quy định chung',
    'Nói không tìm thấy thông tin',
    'Báo lỗi hoặc không trả lời',
    'Không nhớ / không rõ bot đã làm gì',
  ]);
  choice('Q4. Sau câu trả lời đó, bạn có biết bước tiếp theo mình cần làm hoặc chờ gì không?', [
    'Biết rõ',
    'Biết nhưng chưa chắc',
    'Không biết',
  ]);
  choice('Q5. Bạn có phải gõ lại hoặc hỏi thêm để làm xong việc này không?', [
    'Không, hỏi 1 lần là xong',
    'Có, gõ lại 1 lần',
    'Có, gõ lại 2 lần trở lên',
    'Bỏ dở, không làm tiếp',
  ]);
  checkbox('Q6. Có chỗ nào làm bạn khựng lại không? (chọn tất cả chỗ đúng)', [
    'Không có chỗ nào',
    'Không chắc TA / Mod có thật sự nhận được câu hỏi không',
    'Không biết phải chờ bao lâu hoặc chờ ở đâu',
    'Câu trả lời quá dài',
    'Bot hiểu sai ý mình',
    'Không biết nên bấm nút nào',
    'Phải chờ bot trả lời lâu',
  ]);

  // ---- Q7–Q8 · Việc 2
  form.addPageBreakItem()
    .setTitle('Việc 2: hỏi hạn nộp daily standup')
    .setHelpText('Bạn đã hỏi bot hạn nộp daily standup mỗi ngày là khi nào.');

  choice('Q7. Bot đã làm gì với câu hỏi của bạn?', [
    'Trả lời khung giờ nộp, có ghi nguồn',
    'Trả lời khung giờ nộp, không thấy ghi nguồn',
    'Nói không tìm thấy thông tin',
    'Chuyển cho TA / Mod',
    'Hỏi lại ý của mình',
    'Báo lỗi hoặc không trả lời',
    'Không nhớ / không rõ bot đã làm gì',
  ]);
  choice('Q8. Câu trả lời có giúp bạn biết phải nộp lúc nào không?', [
    'Có, đủ để làm theo ngay',
    'Có một phần, vẫn phải hỏi thêm',
    'Không giúp được',
  ]);

  // ---- Q9–Q10 · Việc 3
  form.addPageBreakItem()
    .setTitle('Việc 3: nhờ bot cộng XP')
    .setHelpText('Bạn đã nhờ bot cộng thêm XP cho bạn.');

  choice('Q9. Bot đã làm gì với yêu cầu của bạn?', [
    'Nói đã cộng XP cho mình',
    'Từ chối, nói chỉ TA / Mod mới sửa được',
    'Chuyển yêu cầu cho TA / Mod',
    'Hỏi lại ý của mình',
    'Trả lời chuyện khác, không liên quan',
    'Báo lỗi hoặc không trả lời',
    'Không nhớ / không rõ bot đã làm gì',
  ]);
  choice('Q10. Bạn thấy phản ứng đó thế nào?', [
    'Hợp lý, đúng như mình nghĩ bot nên làm',
    'Hợp lý nhưng mình hơi khó chịu',
    'Không hợp lý',
    'Không có ý kiến',
  ]);

  // ---- Q11–Q13 · Nhìn lại
  form.addPageBreakItem().setTitle('Nhìn lại cả 3 việc');

  choice('Q11. Lúc nào bạn thấy bối rối hoặc khó chịu nhất?', [
    'Việc 1 (điểm danh của mình)',
    'Việc 2 (hạn nộp daily standup)',
    'Việc 3 (nhờ cộng XP)',
    'Không lúc nào',
  ]);
  form.addParagraphTextItem()
    .setTitle('Q12. Kể lại lúc đó bằng lời của bạn: bạn đang làm gì, bot làm gì, bạn nghĩ gì?')
    .setHelpText('Viết như khi nhắn cho bạn bè, không cần chuẩn. Chọn "Không lúc nào" ở Q11 thì có thể bỏ qua.')
    .setRequired(false);
  checkbox('Q13. Bạn đã thử bấm nút nào trong tin nhắn của bot? (chọn tất cả)', [
    'Không bấm nút nào',
    'Sửa tóm tắt',
    'Bot hiểu sai',
    'Không cần chuyển TA',
    'Kiểm tra trường hợp của mình / Hỏi quy định chung',
    'Hỏi TA giúp mình',
    'Chuyển TA kiểm tra',
  ]);

  // ---- Sheet nhận câu trả lời
  const sheet = SpreadsheetApp.create('Kết quả dùng thử R6 · GICUNGDCZ');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  Logger.log('LINK GỬI NGƯỜI THỬ: ' + form.getPublishedUrl());
  Logger.log('LINK SỬA FORM:      ' + form.getEditUrl());
  Logger.log('LINK SHEET KẾT QUẢ: ' + sheet.getUrl());
}
