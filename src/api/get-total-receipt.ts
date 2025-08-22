import { api } from '@/lib/axios'
import { GetReceiptResponse } from './utils'


export async function getTotalReceipt() {
  const response = await api.get<GetReceiptResponse[]>(
    '/total/faturamento',
  )

  return response.data
}
