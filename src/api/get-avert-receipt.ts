import { api } from '@/lib/axios'

export interface GetAvertReceiptResponse {
  estado: String,
  metaFaturamento: {
    faturamento: number,
    meta: number
  }
}

export async function getAvertReceipt() {
  const response = await api.get<GetAvertReceiptResponse[]>(
    '/avert/faturamento',
  )

  return response.data
}
