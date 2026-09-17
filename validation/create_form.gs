/**
 * Tạo Google Form cho vòng dùng thử R6 (thử không đồng bộ) + Google Sheet nhận câu trả lời.
 *
 * Cách chạy (khoảng 2 phút):
 *   1. Mở https://script.google.com → New project
 *   2. Xoá code mẫu, dán toàn bộ file này vào, bấm Save
 *   3. Chọn hàm createR6Form → Run → cấp quyền (Google Forms, Sheets) bằng tài khoản của nhóm
 *   4. Mở View → Logs (hoặc Execution log): có 3 link
 *        - LINK GỬI NGƯỜI THỬ   (dán vào tin nhắn mời thay <link Google Form>)
 *        - LINK SỬA FORM        (chỉ nhóm dùng)
 *        - LINK SHEET KẾT QUẢ   (File → Download → CSV để gửi lại, lưu ngoài repo)
 *
 * Nội dung câu hỏi khớp validation/async-test-kit.md mục 3. Form không thu email hay tên.
 */
function createR6Form() {
  const form = FormApp.create('Dùng thử Trợ lý Discord · Nhóm GICUNGDCZ');
  form
    .setDescription(
      'Form ẩn danh, khoảng 3 phút. Hãy kể đúng những gì đã xảy ra khi bạn dùng thử, ' +
      'kể cả chỗ bạn thấy khó hiểu hay không vừa ý. Nhóm cần nhất là những chỗ đó.\n\n' +
      'Làm 3 việc trên trang demo trước, rồi mới điền form này.')
    .setCollectEmail(false)
    .setAllowResponseEdits(false)
    .setProgressBar(true)
    .setShowLinkToRespondAgain(false)
    .setConfirmationMessage('Cảm ơn bạn đã giúp nhóm GICUNGDCZ!');

  // ---- Thông tin chung
  form.addListItem()
    .setTitle('Mã người thử của bạn (trong tin nhắn mời)')
    .setChoiceValues(['U1', 'U2', 'U3', 'U4', 'U5'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Bạn dùng thử bằng thiết bị nào?')
    .setChoiceValues(['Điện thoại', 'Máy tính'])
    .setRequired(true);

  // ---- Việc 1
  form.addPageBreakItem()
    .setTitle('Việc 1: hỏi điểm danh của bạn')
    .setHelpText('Bạn đã hỏi bot xem buổi workshop gần nhất bạn đã được điểm danh chưa.');

  form.addTextItem()
    .setTitle('Bạn đã gõ gì cho bot?')
    .setHelpText('Copy lại nếu còn, không thì ghi gần đúng.')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Theo bạn, bot đã làm gì với câu hỏi đó?')
    .setHelpText('Kể bằng lời của bạn, không cần đúng thuật ngữ.')
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Sau câu trả lời đó, bạn có biết bước tiếp theo mình cần làm hoặc chờ gì không?')
    .setChoiceValues(['Biết rõ', 'Biết nhưng chưa chắc', 'Không biết'])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Có chỗ nào bạn khựng lại, khó hiểu hoặc không như mong đợi?')
    .setRequired(false);

  // ---- Việc 2
  form.addPageBreakItem()
    .setTitle('Việc 2: hỏi hạn nộp daily standup')
    .setHelpText('Bạn đã hỏi bot hạn nộp daily standup mỗi ngày là khi nào.');

  form.addTextItem()
    .setTitle('Bạn đã gõ gì cho bot?')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Bot trả lời có giúp được bạn không? Vì sao?')
    .setRequired(true);

  // ---- Việc 3
  form.addPageBreakItem()
    .setTitle('Việc 3: nhờ bot cộng XP')
    .setHelpText('Bạn đã nhờ bot cộng thêm XP cho bạn.');

  form.addTextItem()
    .setTitle('Bạn đã gõ gì cho bot?')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Bot phản ứng thế nào, và bạn thấy sao về phản ứng đó?')
    .setRequired(true);

  // ---- Chung
  form.addPageBreakItem().setTitle('Nhìn lại cả 3 việc');

  form.addParagraphTextItem()
    .setTitle('Trong cả 3 việc, lúc nào bạn thấy khó chịu hoặc bối rối nhất? Kể lại lúc đó.')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Có gì bạn đã thử làm mà trang không cho làm, hoặc bạn muốn bấm mà không bấm được?')
    .setRequired(false);

  // ---- Sheet nhận câu trả lời
  const sheet = SpreadsheetApp.create('Kết quả dùng thử R6 · GICUNGDCZ');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  Logger.log('LINK GỬI NGƯỜI THỬ: ' + form.getPublishedUrl());
  Logger.log('LINK SỬA FORM:      ' + form.getEditUrl());
  Logger.log('LINK SHEET KẾT QUẢ: ' + sheet.getUrl());
}
