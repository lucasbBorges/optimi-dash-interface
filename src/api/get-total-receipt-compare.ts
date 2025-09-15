import { api } from '@/lib/axios'
import { GetYearReceiptCompare } from './utils'


export async function getTotalReceiptCompare() {
  const response = await api.get<GetYearReceiptCompare>(
    '/total/faturamento-anual-comparativo',
  )

  return response.data
}
