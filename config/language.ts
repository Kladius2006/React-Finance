export const translations = {

  th: {

    // หน้าเพิ่มรายรับ-จ่าย
    date: 'วันที่ (ปี-เดือน-วัน)',
    add_new_transaction: 'การเพิ่มรายการใหม่',
    category: 'ประเภทการยการ',
    value: 'จำนวนเงิน (บาท)',
    details: 'รายละเอียด/หมายเหตุ',

    // หน้า Home
    balance: 'คงเหลือสุทธิ',
    income: 'รายรับ:',
    expenses: 'รายจ่าย',
    non_data: 'ยังไม่มีการบันทึก',

    // หน้า QR_code
    QR_title: 'การหารบิลกลุ่ม',
    totalAmountLabel: 'ยอดบิลรวมทั้งหมด',
    currency: 'บาท',
    participants: 'ผู้ร่วมหาร',
    people: 'คน',
    addParticipant: 'เพิ่มผู้ร่วมหาร',
    placeholder: 'พิมพ์ชื่อเพื่อน...',
    cancel: 'ยกเลิก',
    add: 'เพิ่ม',
    payAmount: 'ยอดจ่าย:',
    share: 'แชร์ให้เพื่อน',
    me: 'กระผม',
    share_dialog_title: 'แชร์ QR Code',
    share_unsupported: 'ไม่รองรับ',
    share_unsupported_message: 'อุปกรณ์นี้ไม่รองรับการแชร์',
    share_failed: 'แชร์ไม่สำเร็จ',
    share_failed_message: 'ลองใหม่อีกครั้ง',

    // หน้า Balance
    total_balance: 'ยอดเงินรวมในระบบ',
    total_allocated: 'จัดสรรรวม',
    total_spent: 'ใช้ไปรวม',

    category_name_placeholder: 'ชื่อหมวด (เช่น ค่าห้อง)',
    budget_placeholder: 'งบ (บาท)',
    
    priority: 'ลำดับความสำคัญ (บนสุด = สำคัญที่สุด)',
    
    no_categories: 'ยังไม่มีหมวดหมู่เงินจัดสรร',
    add_category_hint: 'กรอกชื่อหมวดหมู่และงบประมาณด้านบนเพื่อเพิ่มรายการ',

    drag_hint: '⋮⋮ กดค้างเพื่อลาก',

    allocated: 'จัดสรร:',
    spent: 'ใช้ไป:',
    remaining: 'เหลือ:',

    spend_placeholder: 'จำนวนเงินที่จ่าย (บาท)',
    save_spend: 'บันทึกจ่าย',

    // Alert
    error: 'เกิดข้อผิดพลาด',
    load_error: 'ไม่สามารถโหลดข้อมูลจากหน่วยความจำได้',

    please_fill: 'กรุณากรอกข้อมูล',
    fill_category_budget: 'ระบุชื่อหมวดหมู่และจำนวนเงินให้ครบถ้วน',

    invalid_data: 'ข้อมูลไม่ถูกต้อง',
    invalid_amount: 'กรุณาระบุจำนวนเงินเป็นตัวเลขที่มากกว่า 0',
    invalid_spend: 'กรุณากรอกจำนวนเงินจ่ายที่ถูกต้อง',

    confirm_delete: 'ยืนยันการลบ',
    confirm_delete_message: 'คุณต้องการลบหมวดหมู่นี้หรือไม่?',
    delete: 'ลบ',

    balance_warning: 'เตือนสมดุลเงิน',
    balance_warning_message: 'เงินในหมวดหมู่อื่นๆ ไม่พอชดเชยส่วนเกินนี้!',

    loading: 'กำลังโหลดข้อมูล...',
  },

  en: {

    // หน้าเพิ่มรายรับ-จ่าย
    date: 'Date (YY-MM-DD)',
    add_new_transaction: 'Add new transaction',
    category: 'Category',
    value: 'Value (THB)',
    details: 'details,note',

    // หน้า Home
    balance: 'income',
    income: 'income:',
    expenses: 'Expenses',
    non_data: 'No data recorded.',

    // หน้า QR_code
    QR_title: 'Group Bill Split',
    totalAmountLabel: 'Total Amount',
    currency: 'THB',
    participants: 'Participants',
    people: 'person(s)',
    addParticipant: 'Add Participant',
    placeholder: 'Enter name...',
    cancel: 'Cancel',
    add: 'Add',
    payAmount: 'Pay:',
    share: 'Share',
    me: 'Me',
    share_dialog_title: 'Share QR Code',
    share_unsupported: 'Not supported',
    share_unsupported_message: 'This device does not support sharing',
    share_failed: 'Share failed',
    share_failed_message: 'Please try again',

    // หน้า Balance
    total_balance: 'Total Balance',
    total_allocated: 'Total Allocated',
    total_spent: 'Total Spent',

    category_name_placeholder: 'Category name (e.g. Rent)',
    budget_placeholder: 'Budget (THB)',

    priority: 'Priority (Top = Most Important)',

    no_categories: 'No budget categories yet',
    add_category_hint: 'Enter a category name and budget above to add an item',

    drag_hint: '⋮⋮ Hold to drag',

    allocated: 'Allocated:',
    spent: 'Spent:',
    remaining: 'Remaining:',

    spend_placeholder: 'Amount spent (THB)',
    save_spend: 'Save Expense',

    // Alert
    error: 'Error',
    load_error: 'Unable to load data from storage',

    please_fill: 'Please fill in the information',
    fill_category_budget: 'Please enter the category name and amount',

    invalid_data: 'Invalid Data',
    invalid_amount: 'Please enter an amount greater than 0',
    invalid_spend: 'Please enter a valid spending amount',

    confirm_delete: 'Confirm Delete',
    confirm_delete_message: 'Are you sure you want to delete this category?',
    delete: 'Delete',

    balance_warning: 'Balance Warning',
    balance_warning_message: 'There is not enough money in other categories to cover this excess!',

    loading: 'Loading...',
  },

};