/**
 * @description CreateParams interface for creating a payment
 */
export interface CreateParams {
  /**
   * @description Template ID for the payment
   */
  template_id: string
  /**
   * @description Merchant ID for the payment
   */
  merchant_id: string
  /**
   * @description Branch ID for the payment
   * It is used to identify which branch is receiving payments.
   */
  branch_id: string
  /**
   * @description POS ID for the payment
   * Defines which terminal device is used for the transaction.
   * It can be left empty like the following format ""
   */
  pos_id: string
  /**
   * @description Receiver information for the payment
   * Section is used for identification of your customer.
   * It includes all the information about your customer.
   */
  receiver: {
    /**
     * @description ID of the receiver
     * Must have a value
     */
    id: string
    /**
     * @description Register number of the receiver
     */
    register_no: string
    /**
     * @description Name of the receiver
     */
    name: string
    /**
     * @description Email of the receiver
     */
    email: string
    /**
     * @description Phone number of the receiver
     */
    phone_number: string
    /**
     * @description Note for the receiver
     */
    note: string
  }
  /**
   * @description Invoice number for the payment
   */
  invoice_no: string
  /**
   * @description Date of the payment
   * Bill generated date
   */
  date: string
  /**
   * @description Description of the payment
   * Information about the bill. For example: "Dec 2019 bill"
   */
  description: string
  /**
   * @description Amount of the payment
   */
  amount: number
  /**
   * @description BTUK code for the payment
   * Used for creating VAT. It must be a product/service registered in the TAX office database.
   * Developer needs to ask from your business department.
   * If vat_flag:"0" then btuk_code can be null ("")
   */
  btuk_code: string
  /**
   * @description VAT flag for the payment
   * If VAT receipt is generated by qPay then it will be "1", if not "0".
   * If business department wants qPay to generate VAT receipt, needs to be registered in qPay.
   */
  vat_flag: string
}

export interface CreateResponse {
  payment_id: number
  qPay_QRcode: string
  qPay_QRimage: string
  qPay_url: string
  qPay_deeplink: Array<{
    name: string
    link: string
  }>
}
