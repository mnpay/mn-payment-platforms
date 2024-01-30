import { type AxiosInstance, type AxiosResponse } from 'axios'

export const useApi = <
  D = any,
  T = any,
  R extends (api: AxiosInstance) => (data: D) => Promise<AxiosResponse<T>> = (
    api: AxiosInstance,
  ) => (data: D) => Promise<AxiosResponse<T>>,
>(
  requestHandler: R,
) => {
  return requestHandler
}
