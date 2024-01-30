export interface HipayResponseBase {
  /** хүсэлтийн төлөв: 1:амжилттай, 0:амжилтгүй */
  code: 0 | 1 | '0' | '1'
}

export interface HipayResponseSuccess extends HipayResponseBase {
  code: '1' | 1
  [key: string]: unknown
}

export interface HipayResponseFail extends HipayResponseBase {
  code: '0' | 0
  description: string
  details: Array<{ field: string; issue: string }>
}

export type HipayResponse<T extends HipayResponseSuccess = HipayResponseSuccess> = T | HipayResponseFail
