export const generateInvoiceUrl = ({
  baseUrl,
  paymentMethod,
  language,
  invoiceNumber,
}: {
  baseUrl: string
  paymentMethod: 'payment' | 'socialpay'
  language: 'mn' | 'en'
  invoiceNumber: string
}): string => {
  return `${baseUrl}/${paymentMethod}/${language}/${invoiceNumber}`
}
