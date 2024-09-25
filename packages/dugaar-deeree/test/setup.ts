import { beforeAll, afterEach, afterAll } from 'vitest'
import { server } from '@mnpay/dugaar-deeree/test/mocks'

beforeAll(() => {
  server.listen()
})

afterEach(() => {
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})
