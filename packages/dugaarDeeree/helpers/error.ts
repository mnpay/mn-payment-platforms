import { Code, codeToErrorMessage } from '@mnpay/dugaar-deeree/constants'
import { getAxiosError } from '@packages/core'
import { type DugaarDeereeResponseError } from '@mnpay/dugaar-deeree/types'

export const getDugaarDeereeErrorResponse = (error: unknown) => {
  const axiosError = getAxiosError<DugaarDeereeResponseError>(error)

  const code = axiosError?.response?.data?.code
  const intCode = axiosError?.response?.data?.intCode ?? 999
  const status = axiosError?.response?.status ?? 400

  if (code && codeToErrorMessage[code]) {
    return {
      status,
      data: { code, intCode, message: codeToErrorMessage[code] },
    }
  }

  return {
    status,
    data: {
      code: Code.unknown,
      intCode,
      message: codeToErrorMessage[Code.unknown],
    },
  }
}
