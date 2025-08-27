import { api } from '@/lib/axios'
import { GetReceiptCUResponse } from './utils'


export async function getTotalReceiptCU() {
  const response = await api.get<GetReceiptCUResponse[]>(
    '/total/faturamento-comparativo',
  )

  return response.data
}
