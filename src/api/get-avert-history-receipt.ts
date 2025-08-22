import { api } from '@/lib/axios'

export interface GetAvertHistoryReceiptResponse {
  data: String,
  agregacaoPorEstadoAvert: [
    {
      estado: String,
      faturamentoPositivacaoDTO: {
        faturamento: number,
        positivacao: number
      }
    }
  ]
}

export async function getAvertHistoryReceipt() {
  const response = await api.get<GetAvertHistoryReceiptResponse[]>(
    '/avert/faturamento-retrospec',
  )

  return response.data
}
