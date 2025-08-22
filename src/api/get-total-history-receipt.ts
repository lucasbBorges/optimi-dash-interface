import { api } from '@/lib/axios'

export interface GetTotalHistoryReceiptResponse {
  date: String,
  faturamento: number
}

export async function getTotalHistoryReceipt() {
  const response = await api.get<GetTotalHistoryReceiptResponse[]>(
    '/total/faturamento-retrospec',
  )

  return response.data
}
