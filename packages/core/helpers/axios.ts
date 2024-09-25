import axios, { type AxiosError, type AxiosInstance, type AxiosResponse } from 'axios'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getAxiosError = <T = any, D = any>(err: unknown | any): AxiosError<T, D> | undefined => {
  if (axios.isAxiosError(err)) {
    return err
  }

  return undefined
}

export const useApi = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  D = any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T = any,
  S = undefined,
  R extends (
    ...params: S extends undefined ? [AxiosInstance] : [AxiosInstance, S]
  ) => (data: D) => Promise<AxiosResponse<T>> = (
    ...params: S extends undefined ? [AxiosInstance] : [AxiosInstance, S]
  ) => (data: D) => Promise<AxiosResponse<T>>,
>(
  requestHandler: R,
) => {
  return requestHandler
}
