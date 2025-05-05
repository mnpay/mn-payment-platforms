export interface GetSettlementDetailQueryParams {
  page: number
  size: number
  start: string
  end: string
}

export interface GetSettlementDetailsParams {
  checksum: string
  token: string
  merchantId: string
}

export interface SettlementDetail {
  id: number
  merchantId: string
  terminalId: string
  batchNumber: string
  invoiceNumber: string
  cardNumber: string
  token: string
  amount: string
  merchantInvoice: string
  respCode: string
  respDesc: string
  tranTime: string
  tranDate: string
  sysReference: string
  approvalCode: string
  freeText1: string | null
  freeText2: string | null
  freeText3: string | null
  requestDate: string
  reversedDate: string | null
  checkedDate: string
  transferStatus: string
}

export interface GetSettlementDetailsResponse {
  content: SettlementDetail[]
  pageable: {
    first: boolean
    last: boolean
    totalPages: number
    totalElements: number
  }
}
