export interface Discount {
  /**
   * Байгууллагын дотоод хөнгөлөлтийн код
   * Тип: string
   * Хэрэглэхгүй
   * Урт ихдээ: 45
   * Жишээ: Discount_01
   */
  discount_code?: string
  /**
   * Утга
   * Тип: string
   * Хэрэглэхгүй
   * Урт ихдээ: 100
   * Жишээ: uPoint хямдрал
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
