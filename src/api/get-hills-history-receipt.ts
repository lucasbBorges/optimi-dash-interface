import { api } from '@/lib/axios'

export interface GetHillsHistoryReceiptResponse {
  date: String,
  faturamentoPorEstadoDTO: [
    {
      estado: String,
      faturamento: number
    }
  ]
}

export async function getHillsHistoryReceipt() {
  const response = await api.get<GetHillsHistoryReceiptResponse[]>(
    '/hills/faturamento-retrospec',
  )

  return response.data
}
