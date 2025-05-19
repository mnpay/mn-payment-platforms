import { AxiosError } from 'axios'
import { qpay, isSandBox } from '../mocks/api'

describe('Get Invoice', () => {
  it('should get an invoice', async () => {
    if (!isSandBox) {
      return
    }
    try {
      const invoice = await qpay.getInvoice({ invoice_id: '123' })
      expect(invoice).toBeDefined()
    } catch (error) {
      const data = (error as AxiosError).response?.data

      expect(data).toStrictEqual({ error: 'INVOICE_NOTFOUND', message: 'Нэхэмжлэл олдсонгүй' })
    }
  })
})
