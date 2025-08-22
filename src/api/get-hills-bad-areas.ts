import { api } from '@/lib/axios'
import { BadAreas } from './utils'


export async function getHillsBadAreas() {
  const response = await api.get<BadAreas[]>(
    '/hills/piores-pracas',
  )

  return response.data
}
