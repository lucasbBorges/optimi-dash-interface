import { api } from '@/lib/axios'

export interface GetTopFornecs {
  fornec: String,
  faturamento: number
}

export async function getTopFornecsMonth() {
  const response = await api.get<GetTopFornecs[]>(
    '/total/top-fornec-mensal',
  )

  return response.data
}
