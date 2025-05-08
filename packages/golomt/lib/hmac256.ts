const getCreateHmac = async () => {
  if (typeof window === 'undefined') {
    return (await import('crypto')).createHmac
  }

  throw new Error('HMAC is not supported in the browser')
}

export const hmac256 = async (key: string, message: string) => {
  const createHmac = await getCreateHmac()
  const hash = createHmac('sha256', key.trim()).update(message.trim())

  return hash.digest('hex')
}
