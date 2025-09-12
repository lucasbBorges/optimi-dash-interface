import { api } from '@/lib/axios'

export interface GetTopFornecs {
  fornec: String,
  faturamento: number
}

export async function getTopFornecsYear() {
  const response = await api.get<GetTopFornecs[]>(
    '/total/top-fornec-anual',
  )

  return response.data
}
