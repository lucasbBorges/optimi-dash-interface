import { api } from '@/lib/axios'
import { BadAreas } from './utils'


export async function getAvertBadAreas() {
  const response = await api.get<BadAreas[]>(
    '/avert/piores-pracas',
  )

  return response.data
}
