export enum Code {
  userInactive = 'USER_INACTIVE',
  personDeviceNotFound = 'PERSON_DEVICE_NOT_FOUND',
  badRequest = 'BAD_REQUEST',
  validationFailed = 'VALIDATION_FAILED',
  processedRequest = 'PROCESSED_REQUEST',
  expiredPurchase = 'EXPIRED_PURCHASE',
  expiredValidation = 'EXPIRED_VALIDATION',
  limitExceeded = 'LIMIT_EXCEEDED',
  invalidIdentification = 'INVALID_IDENTIFICATION',
  purchaseRequestNotFound = 'PURCHASE_REQUEST_NOT_FOUND',
  unknown = 'UNKNOWN',
}

export const codeToErrorMessage = {
  [Code.userInactive]: 'Та Mobicom-н "Дугаар Дээрээ" үйлчилгээг идэвхжүүлээгүй байна!',
  [Code.personDeviceNotFound]: 'Та Mobicom-н "Дугаар Дээрээ" үйлчилгээг идэвхжүүлээгүй байна!',
  [Code.badRequest]: 'Өгөгдөл буруу байна!',
  [Code.validationFailed]: 'Баталгаажуулах TAN кодын хугацаа дууссан байна!',
  [Code.processedRequest]: 'Биелэгдсэн нэхэмжлэх байна!',
  [Code.expiredPurchase]: 'Гүйлгээг баталгаажуулах хугацаа дууссан байна!',
  [Code.expiredValidation]: 'Баталгаажуулах хугацаа дууссан байна!',
  [Code.limitExceeded]: 'Үлдэгдэл хүрэлцэхгүй байна!',
  [Code.invalidIdentification]: 'TAN код буруу байна!',
  [Code.purchaseRequestNotFound]: 'Гүйлгээ олдсонгүй!',
  [Code.unknown]: 'Алдаа гарлаа!',
} as const
