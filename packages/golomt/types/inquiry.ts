export interface InquiryParams {
  /**
   * Байгууллагаас дамжуулах давхцахгүй гүйлгээний дугаар байна
   */
  transactionId: string
  /**
   * checksum = transactionId + transactionId
   */
  checksum: string
}

export interface InquiryBaseResponse {
  /**
   * Төлбөрийн мэдээлэл илгээсэн, PENDING=Төлбөр хүлээгдэж байгаа
   */
  status: 'SENT' | 'PENDING'
  /**
   * Картаас хасалт хийсэн мөнгөн дүн
   */
  amount: string
  /**
   * Карт гаргагч банкны нэр
   */
  bank: string
  /**
   * Карт эзэмшигчийн нэр
   */
  cardHolder: string
  /**
   * Гүйлгээ хийгдсэн картын дугаар
   */
  cardNumber: string
  /**
   * Сатус кодны тайлбар
   */
  errorDesc: string
  /**
   * Гүйлгээний статус код
   */
  errorCode: string
  /**
   * Мерчантын гүйлгээний дугаар
   */
  transactionId: string
  /**
   * checksum = transactionId + errorCode + amount + token
   * Токен үүсээгүй үед token талбарыг оролцуулахгүй
   */
  checksum: string
}

export interface InquirySuccessResponse extends InquiryBaseResponse {
  /**
   * Картыг илэрхийлэх токен дугаар
   */
  token: string
  errorCode: '000'
}

export type InquiryErrorResponse = InquiryBaseResponse

export type InquiryResponse = InquirySuccessResponse | InquiryErrorResponse
