import { beforeAll, afterEach, afterAll } from 'vitest'
import { server } from 'mn-dugaar-deeree/test/mocks'

beforeAll(() => {
  server.listen()
})

afterEach(() => {
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})
