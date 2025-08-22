import { api } from '@/lib/axios'

export interface GetTopFornecs {
  fornec: String,
  faturamento: number
}

export async function getTopFornecs() {
  const response = await api.get<GetTopFornecs[]>(
    '/total/top-fornec',
  )

  return response.data
}
