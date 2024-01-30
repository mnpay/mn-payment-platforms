export enum IntCode {
  /** Success */
  success = 0,
  /** Хүсэлт буруу */
  wrongRequest = 2,
  /** OTP кодыг ашиглах боломжгүй болсон */
  otpCodeUnavailable = 3,
  /** Хүсэлт буруу */
  badRequest = 5,
  /** Идэвхигүй данс */
  invalidAccount = 6,
  /** Худалдан авалтын хүсэлтыг баталгаажуулах хугацаа дууссан */
  purchaseRequestExpired = 8,
  /** Худалдан авалтын хүсэлт амжилтгүй болсон */
  purchaseRequestFailed = 10,
  /** Худалдан авалт баталгаажаагүй */
  purchaseRequestNotConfirmed = 11,
  /** Тан код буруу or Баталгаажуулах код буруу оруулсан */
  wrongConfirmationCode = 12,
  /** Хэрэглэгчийн бүртгэл олдоогүй */
  userNotFound = 14,
  /** Худалдан авалтын хүсэлт олдоогүй */
  purchaseRequestNotFound = 15,
  /** Хэрэглэгч данс олдоогүй */
  userBankAccountNotFound = 16,
  /** OTP кодын баталгаажуулалтын хугацаа дууссан */
  otpCodeConfirmationTimeout = 19,
  /** Худалдан авалтыг баталгаажуулах боломжгүй */
  purchaseRequestCanNotBeConfirmed = 21,
  /** Хэрэглэгчийн бүртгэл алдаатай */
  wrongUserInfo = 25,
  /** Хэрэглэгч идэвхгүй төлөвт байна */
  userInactive = 26,
  /** Internal System Error */
  internalSystemError = 999,
}
