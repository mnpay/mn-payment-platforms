import { Offset } from '../core'

/**
 * Payment List Request Parameters
 * customer_id, card_terminal_id, p2p_terminal_id -ийн мэдээллийг qPay merchant web admin-аас эсвэл qPay -ээс авна.
 */
export interface PaymentListRequestParams {
  /**
   * Object type
   * @example MERCHANT
   */
  object_type: string
  /**
   * Object ID
   * @example 00f94137-66fd-4d90-b2b2-8225c1b4ed2d
   */
  object_id: string
  /**
   * Merchant branch code
   * @example branch_01
   */
  merchant_branch_code?: string
  /**
   * Merchant terminal code
   * @example terminal_01
   */
  merchant_terminal_code?: string
  /**
   * Merchant staff code
   * @example staff_01
   */
  merchant_staff_code?: string
  offset?: Offset
}

/**
 * Payment List Response
 */
export interface PaymentListResponse {
  payment_id?: string
  payment_date?: Date
  payment_status?: string
  payment_fee?: number
  payment_amount?: number
  payment_currency?: string
  payment_wallet?: string
  payment_name?: string
  /**
   * @example Юнивишн төлбөр
   */
  payment_description?: string
  /**
   * @example 000201010211152527940496279404962005110165204541153034965802MN59092005110166011ULAANBAATAR621407102005-1101663040D47
   */
  qr_code?: string
  /**
   * @example CARD
   */
  paid_by?: string
  /**
   * Object type
   * @example INVOICE
   */
  object_type?: string
  /**
   * Object ID
   * @example 00f94137-66fd-4d90-b2b2-8225c1b4ed2d
   */
  object_id?: string
}
