export const useExpiryToken = () => {
  let tokenExpiryTime: number | null = null

  const getNewExpiryTime = () => {
    const now = new Date().valueOf()
    return now + 60 * 60 * 1000
  }

  const setNewExpiryTime = (time: number) => {
    tokenExpiryTime = time
  }

  const getIsExpired = () => {
    if (tokenExpiryTime === null) {
      return true
    }
    return tokenExpiryTime < new Date().valueOf()
  }

  return {
    getIsExpired,
    getNewExpiryTime,
    setNewExpiryTime,
  }
}
