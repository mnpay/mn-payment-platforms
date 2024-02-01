import { describe, beforeEach, test, expect } from 'vitest'
import {
  type CheckCustomerResponse,
  DugaarDeereeUrl,
  apiBaseURL,
  useDugaarDeeree,
  IntCode,
  type PurchaseInitiateResponse,
} from 'mn-dugaar-deeree/index'
import { http, HttpResponse } from 'msw'
import { server } from 'mn-dugaar-deeree/test/mocks'

describe('dugaarDeeree', () => {
  let dugaarDeeree: ReturnType<typeof useDugaarDeeree>

  beforeEach(() => {
    dugaarDeeree = useDugaarDeeree({
      clientId: 'clientId',
      clientSecret: 'clientSecret',
    })
    server.use(
      http.post(`${apiBaseURL}${DugaarDeereeUrl.authenticate}`, () => {
        return HttpResponse.json({ result: 'access-token' })
      }),
    )
  })

  test('should authenticate successfully', async () => {
    server.use(
      http.post(`${apiBaseURL}${DugaarDeereeUrl.authenticate}`, () => {
        return HttpResponse.json({ result: 'access-token' })
      }),
    )

    const response = await dugaarDeeree.authenticate()
    expect(response.data.result).toBe('access-token')
    expect(dugaarDeeree.getIsExpired()).toBe(false)
  })

  test('should check customer successfully', async () => {
    const isdn = '1234567890'
    server.use(
      http.get(`${apiBaseURL}${DugaarDeereeUrl.checkCustomer}`, () => {
        return HttpResponse.json<CheckCustomerResponse>({
          intCode: IntCode.success,
        })
      }),
    )
    const response = await dugaarDeeree.checkCustomer({ isdn })
    expect(response.data.intCode).toBe(IntCode.success)
  })

  test('should not able to check customer if api fails', async () => {
    const isdn = '1234567890'
    server.use(
      http.post(`${apiBaseURL}${DugaarDeereeUrl.authenticate}`, () => {
        return new HttpResponse(
          JSON.stringify({
            intCode: IntCode.userInactive,
          }),
          {
            status: 400,
          },
        )
      }),
      http.get(`${apiBaseURL}${DugaarDeereeUrl.checkCustomer}`, () => {
        return HttpResponse.json<CheckCustomerResponse>({
          intCode: IntCode.success,
        })
      }),
    )

    // const response = await dugaarDeeree.checkCustomer({ isdn });
    await expect(dugaarDeeree.checkCustomer({ isdn })).rejects.toThrow()
  })

  test('should initiate purchase successfully', async () => {
    const purchaseData = {
      buyer: 'buyer',
      amount: 100,
      description: 'description',
    }
    server.use(
      http.post(`${apiBaseURL}${DugaarDeereeUrl.purchaseInitiate}`, () => {
        return HttpResponse.json<PurchaseInitiateResponse>({
          intCode: IntCode.success,
          result: 'purchase-initiated',
        })
      }),
    )
    const response = await dugaarDeeree.purchaseInitiate(purchaseData)
    expect(response.data.result).toBe('purchase-initiated')
  })

  test('should confirm purchase successfully', async () => {
    const confirmData = { invoiceNo: 'invoiceNo', tan: 'tan' }
    server.use(
      http.post(`${apiBaseURL}/cb/purchase/confirm`, () => {
        return HttpResponse.json({ result: 'purchase-confirmed' })
      }),
    )
    const response = await dugaarDeeree.purchaseConfirm(confirmData)
    expect(response.data.result).toBe('purchase-confirmed')
  })

  test('should check statement successfully', async () => {
    const statementData = {
      startDate: '2022-01-01',
      endDate: '2022-12-31',
      offset: 0,
      limit: 10,
    }
    server.use(
      http.get(`${apiBaseURL}/cb/statement/check`, () => {
        return HttpResponse.json({ result: 'statement-data' })
      }),
    )
    const response = await dugaarDeeree.checkStatement(statementData)
    expect(response.data.result).toBe('statement-data')
  })

  test('should check transaction successfully', async () => {
    const invoiceId = 'invoiceId'
    server.use(
      http.get(`${apiBaseURL}/cb/transaction/check`, () => {
        return HttpResponse.json({ result: 'transaction-data' })
      }),
    )
    const response = await dugaarDeeree.checkTransaction({ invoiceId })
    expect(response.data.result).toBe('transaction-data')
  })
})
