import { parseUrlPath } from '@packages/core/lib/urlPath'

describe('parseUrlPath', () => {
  it('should return the correct url path', () => {
    const urlPath = parseUrlPath('/invoice/:invoice_id', { invoice_id: '00f94137-66fd-4d90-b2b2-8225c1b4ed2d' })
    expect(urlPath).toBe('/invoice/00f94137-66fd-4d90-b2b2-8225c1b4ed2d')
  })
})
