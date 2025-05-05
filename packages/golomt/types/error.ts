import { z } from 'zod'
import { errorResponseSchema } from '../schemas/errorResponseSchema'

export type ErrorResponse = z.infer<typeof errorResponseSchema>

/**
 * - 200	Амжилттай болсон гэж үзэн тухайн функцын json форматтай утга ирнэ.
 * - 400	Bad request буюу тухайн функцыг дуудах шаардлагуудыг хангаагүй.
 * - 403	Header authorization тохируулаагүй болон буруу, алдаатай, хоосон токен явуулсан үед хоосон утга буцна
 * - 500	Систем дээрх алдаа гарсан үед ирэх
 */
export type ErrorStatus = ErrorResponse['status']

/**
 * Ямар төрлийн алдааг илэрхийлэх. Validation NotFound Internal Forbidden төрлүүд буцна
 */
export type ErrorType = ErrorResponse['error']
