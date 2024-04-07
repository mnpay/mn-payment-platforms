import { type AxiosInstance, type AxiosResponse } from 'axios'

export const useApi = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  D = any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T = any,
  R extends (api: AxiosInstance) => (data: D) => Promise<AxiosResponse<T>> = (
    api: AxiosInstance,
  ) => (data: D) => Promise<AxiosResponse<T>>,
>(
  requestHandler: R,
) => {
  return requestHandler
}
