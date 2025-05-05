import { YesNo } from './core'

export interface InvoiceParams {
  /** Картаас хасалт хийх мөнгөн дүн */
  amount: number
  /** Харилцагчийн browser дээрээс callback буюу redirect хийх мерчантын url байна */
  callback: string
  /** checksum = transactionId +amount + returnType + callback */
  checksum?: string
  /** Y үед гүйлгээ хийгдсэний дараа тухайн картыг илэрхийлэх token авна. N үед token авахгүй. */
  genToken: YesNo
  /** Мерчантын url рүү redirect хийх method-н POST GET утга байна. MOBILE үед app-н deeplink дуудна. */
  returnType: 'POST' | 'GET'
  /** Мерчантын гүйлгээний дугаар байна. */
  transactionId: string
  /** Y үед socialpay deeplink авна, N үед авахгүй */
  socialDeeplink: YesNo
}

export interface InvoiceResponse {
  /** Банк талаас үүсгэх checksum */
  checksum: string
  /** Мерчантын гүйлгээний дугаар байна */
  transactionId: string
  /** Тухайн гүйлгээний дугаар дээр үүссэн нэмэмжлэхийн дугаар */
  invoice: string
  /** Socialpay deeplink байна */
  socialDeeplink: string
}
