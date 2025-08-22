import { api } from '@/lib/axios'
import { GetReceiptResponse } from './utils'


export async function getHillsReceipt() {
  const response = await api.get<GetReceiptResponse[]>(
    '/hills/faturamento',
  )

  return response.data
}
