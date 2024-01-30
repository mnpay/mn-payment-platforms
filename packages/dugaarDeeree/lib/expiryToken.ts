import { dayjs } from '@packages/core'
import { type Dayjs, type ConfigType } from 'dayjs'

export const useExpiryToken = () => {
  let tokenExpiryTime: Dayjs | null = null

  const getNewExpiryTime = () => dayjs().add(1, 'hour')

  const setNewExpiryTime = (time: ConfigType) => {
    tokenExpiryTime = dayjs(time)
  }

  const getIsExpired = () => {
    if (tokenExpiryTime === null) {
      return true
    }
    return dayjs().isSameOrAfter(tokenExpiryTime)
  }

  return {
    getIsExpired,
    getNewExpiryTime,
    setNewExpiryTime,
  }
}
