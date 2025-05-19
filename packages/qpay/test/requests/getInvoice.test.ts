import { AxiosError } from 'axios'
import { mockApi, qpay } from '../mocks/api'
import { QpayRequestPath } from '@mnpay/qpay/constants'

describe('Get Invoice', () => {
  mockApi?.onGet(QpayRequestPath.getInvoice).reply(200, {
    invoice_id: '123',
    invoice_status: 'paid',
    invoice_amount: 1000,
    invoice_currency: 'MNT',
    invoice_created_at: '2021-01-01',
  })

  it('should get an invoice', async () => {
    try {
      const invoice = await qpay.getInvoice({ invoice_id: '123' })
      expect(invoice).toBeDefined()
    } catch (error) {
      const data = (error as AxiosError).response?.data

      expect(data).toStrictEqual({ error: 'INVOICE_NOTFOUND', message: 'Нэхэмжлэл олдсонгүй' })
    }
  })
})
