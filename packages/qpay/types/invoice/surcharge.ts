/**
 * Нэмэлт төлбөр
 */
export interface Surcharge {
  /**
   * Байгууллагын дотоод нэмэлт төлбөрийн код
   * Тип: string
   * Хэрэглэхгүй
   * Урт ихдээ: 45
   * Жишээ: Surcharge_01
   */
  surcharge_code?: string
  /**
   * Утга
   * Тип: string
   * Хэрэглэхгүй
   * Урт ихдээ: 100
   * Жишээ: Хүргэлтийн зардал
   */
  description: string
  /**
   * Дүн
   * Тип: number
   * Хэрэглэхгүй
   * Жишээ: 100
   */
  amount: number
  /**
   * Тэмдэглэл
   * Тип: string
   * Хэрэглэхгүй
   * Жишээ: тэмдэглэл
   */
  note?: string
}
