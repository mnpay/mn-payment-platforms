import { golomtDefaultBaseUrl } from '../constants/url'
export const generateInvoiceUrl = ({
  baseUrl = golomtDefaultBaseUrl,
  paymentMethod,
  language,
  invoiceNumber,
}: {
  baseUrl?: string
  paymentMethod: 'payment' | 'socialpay'
  language: 'mn' | 'en'
  invoiceNumber: string
}): string => {
  return `${baseUrl}/${paymentMethod}/${language}/${invoiceNumber}`
}
