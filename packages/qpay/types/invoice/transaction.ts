import { Account } from './account'

/**
 * Гүйлгээ
 */
export interface Transaction {
  /**
   * Гүйлгээний утга
   * Тип: string
   * Хэрэглэхгүй
   * Урт ихдээ: 100
   * Жишээ: Тест төлбөр
   */
  description: string
  /**
   * Мөнгөн дүн
   * Тип: number
   * Хэрэглэхгүй
   * Жишээ: 100
   */
  amount: number
  /**
   * Банкны данс
   * Тип: array
   * Хэрэглэхгүй
   * Жишээ: []
   */
  accounts?: Account[]
}
