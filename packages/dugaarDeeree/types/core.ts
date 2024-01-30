import { type Code, type IntCode } from '@packages/dugaar-deeree/constants'

export interface DugaarDeereeResponse<I extends IntCode> {
  intCode: I
  code?: Code
  info?: string
}

export interface DugaarDeereeResponseSuccess<T = string, I extends IntCode = IntCode.success>
  extends DugaarDeereeResponse<I> {
  result: T
}

export type DugaarDeereeResponseError<I extends IntCode = Exclude<IntCode, IntCode.success>> = DugaarDeereeResponse<I>

export interface Transaction {
  amount: number
  buyerIsdn: string
}

export interface TransactionHistory {
  /** @description Гүйлгээний хуулга эхлэх огноо */
  startDate: string
  /** @description Гүйлгээний хуулга дуусах огноо */
  endDate: string
  /** @description Хэдэн гүйлгээнээс хойш авах */
  offset: number
  /** @description Хэдэн гүйлгээ авах */
  limit: number
  /** @description Нийт гүйлгээний бичлэгийн тоо */
  total: number
  /** @description Гүйлгээний мэдээлэл */
  response: Transaction[]
}
