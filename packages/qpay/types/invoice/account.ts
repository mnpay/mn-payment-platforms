/**
 * Банкны данс
 */
export interface Account {
  /**
   * Банкны кодууд
   * Тип: string
   * Хэрэглэхгүй
   * Жишээ: bank codes, currency
   */
  account_bank_code: string
  /**
   * Дансны дугаар
   * Тип: string
   * Хэрэглэхгүй
   * Урт ихдээ: 100
   * Жишээ: 50************
   */
  account_number: string
  /**
   * Дансны нэр
   * Тип: string
   * Хэрэглэхгүй
   * Урт ихдээ: 100
   * Жишээ: ККТТ
   */
  account_name: string
  /**
   * Валют
   * Тип: string
   * Хэрэглэхгүй
   * Жишээ: bank codes, currency
   */
  account_currency: string
}
