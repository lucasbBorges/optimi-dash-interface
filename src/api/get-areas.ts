import { api } from '@/lib/axios'

export type Praca= { praca: string }


export async function getActiveAreas() {
  const response = await api.get<Praca[]>(
    '/metas/listar-pracas',
  )
  return response.data
}
