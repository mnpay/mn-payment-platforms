import axios, { type AxiosError } from 'axios'

export const getAxiosError = <T = any, D = any>(err: unknown | any): AxiosError<T, D> | undefined => {
  if (axios.isAxiosError(err)) {
    return err
  }

  return undefined
}
