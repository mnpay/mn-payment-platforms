import { Offset } from '../core'
import { PaymentGetRequestParams } from './paymentGet'

/**
 * Request interface for PaymentCheckRequestParams
 */
export interface PaymentCheckRequestParams extends PaymentGetRequestParams {
  /**
   * Обьектын төрөл INVOICE: Нэхэмжлэх QR: QR код ITEM: Бүтээгдэхүүн
   * @example 'INVOICE'
   */
  object_type: string
  /**
   * Обьектын ID Обьектын төрөл QR үед QR кодыг ашиглана
   * Нэхэмжлэлийн төлбөр шалгах бол object_type=INVOICE байх шаардлагатай
   */
  object_id: string
  /**
   * The offset object
   */
  offset?: Offset
}

/**
 * Interface for a payment row
 */
export interface PaymentCheckResponseRow {
  /**
   * The ID of the payment
   */
  payment_id: number
  /**
   * The status of the payment
   */
  payment_status: string
  /**
   * The date when the payment was made
   */
  payment_date: Date
  /**
   * The fee for the payment
   */
  payment_fee: number
  /**
   * The amount of the payment
   */
  payment_amount: number
  /**
   * The currency of the payment
   */
  payment_currency: string
  /**
   * The wallet used for the payment
   */
  payment_wallet: string
  /**
   * The type of the transaction
   */
  transaction_type: string
}

/**
 * Response interface for PaymentResponse
 */
export interface PaymentCheckResponse {
  /**
   * The total count of rows
   */
  count: number
  /**
   * The amount paid for the payment
   */
  paid_amount: number
  /**
   * An array of payment rows
   */
  rows: PaymentCheckResponseRow[]
}
