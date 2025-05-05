import { AxiosInstance } from 'axios'
import { GolomtRequestPath } from '../constants/url'
import { GetSettlementDetailQueryParams, GetSettlementDetailsParams } from '../types/getSettlementDetails'

export const makeGetSettlementDetailsRequest = (api: AxiosInstance) => {
  return (data: GetSettlementDetailsParams, queryParams: GetSettlementDetailQueryParams) => {
    return api.post(GolomtRequestPath.getSettlementDetails, data, { params: queryParams })
  }
}
