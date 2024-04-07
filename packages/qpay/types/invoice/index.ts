import { Line } from './line'
import { Transaction } from './transaction'
import { Url } from './url'

/**
 * Төлбөрийн нэхэмжлэл үүсгэх хүсэлт
 */
export interface CreateInvoiceRequestParams {
  /**
   * qpay-ээс өгсөн нэхэмжлэхийн код
   */
  invoice_code: string
  /**
   * Байгууллагаас үүсгэх давтагдашгүй нэхэмжлэлийн дугаар
   */
  sender_invoice_no: string
  /**
   * Байгууллагын салбарын код
   */
  sender_branch_code?: string
  /**
   * Байгууллагын салбарын мэдээлэл
   */
  sender_branch_data?: object
  /**
   * Байгууллагын ажилтаны давтагдашгүй код
   */
  sender_staff_code?: string
  /**
   * Байгууллагын ажилтаны мэдээлэл
   */
  sender_staff_data?: object
  /**
   * Байгууллага өөрсдийн ашиглаж буй терминалаа давхцалгүй дугаарласан код
   */
  sender_terminal_code?: string
  /**
   * Байгууллагын терминалын мэдээлэл
   */
  sender_terminal_data?: object
  /**
   * Байгууллагын нэхэмжлэхийг хүлээн авч буй харилцагчийн дахин давтагдашгүй дугаар
   */
  invoice_receiver_code: string
  /**
   * Нэхэмжлэл хүлээн авагчийн мэдээлэл
   */
  invoice_receiver_data?: object
  /**
   * Нэхэмжлэлийн утга
   */
  invoice_description: string
  /**
   * Нэхэмжлэлийн хүчингүй болох огноо
   */
  invoice_due_date?: Date
  /**
   * Хугацаа хэтэрсэн ч төлж болох эсэх
   */
  enable_expiry?: boolean
  /**
   * Нэхэмжлэхийн дуусах хугацаа
   */
  expiry_date?: Date
  /**
   * Нөат-ын тооцоолол
   */
  calculate_vat?: boolean
  /**
   * ИБаримт үүсгүүлэх байгууллагын мэдээлэл - Байгууллага бол байгууллагын регистерийн дугаар - Хэрэглэгчийн регистерийн дугаар
   */
  tax_customer_code?: string
  /**
   * БТҮК код - Барааны Lines хоосон үед ашиглана
   */
  line_tax_code?: string
  /**
   * Хувааж төлж болох эсэх
   */
  allow_partial?: boolean
  /**
   * Төлөх хамгийн бага дүн
   */
  minimum_amount?: number
  /**
   * Илүү төлж болох
   */
  allow_exceed?: boolean
  /**
   * Төлөх хамгийн их дүн
   */
  maximum_amount?: number
  /**
   * Мөнгөн дүн
   */
  amount?: number
  /**
   * Төлбөр төлсөгдсөн эсэх талаар мэдэгдэл авах URL
   */
  calback_url?: string
  /**
   * Тэмдэглэл
   */
  note?: string
  /**
   * Мөрүүд
   */
  lines?: Line[]
  /**
   * Гүйлгээ
   */
  transactions?: Transaction[]
}

// /**
//  * Төлбөрийн нэхэмжлэл тест хариу үүсгэх хүсэлт
//  */
// export interface InvoiceTestRequestParams {
//   /**
//    * qpay-ээс өгсөн нэхэмжлэхийн код
//    */
//   invoice_code: string
//   /**
//    * Байгууллагаас үүсгэх давтагдашгүй нэхэмжлэлийн дугаар
//    */
//   sender_invoice_no: string
//   /**
//    * Байгууллагын нэхэмжлэхийг хүлээн авч буй харилцагчийн дахин давтагдашгүй дугаар
//    */
//   invoice_receiver_code: string
//   /**
//    * Нэхэмжлэлийн утга
//    */
//   invoice_description: string
//   /**
//    * Мөнгөн дүн
//    */
//   amount: number
//   /**
//    * Төлбөр төлсөгдсөн эсэх талаар мэдэгдэл авах URL
//    */
//   calback_url: string
// }

export interface GetOrCancelInvoiceRequestParams {
  invoice_id: string
}

/**
 * Төлбөрийн нэхэмжлэл хариу үүсгэх хүсэлт
 */
export interface InvoiceResponse {
  /**
   * Нэхэмжлэлийн дугаар
   */
  invoice_id: string
  /**
   * Данс болон картын гүйлгээ дэмжих QR утга
   */
  qr_text: string
  /**
   * Зурган хэлбэрээр үүсэх QR
   */
  qr_image: string
  /**
   * Банкны апп-руу үсрэх холбоос линкүүд
   */
  urls: Url[]
}
