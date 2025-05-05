import { createHmac } from 'crypto'

export const hmac256 = (key: string, message: string) => {
  const hash = createHmac('sha256', key.trim()).update(message.trim())

  return hash.digest('hex')
}
