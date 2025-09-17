import { api } from '@/lib/axios'

export interface GlobalAnalysisResponse {
  praca: string,
  media_atual: number,
  perc_particip: number,
  maior_media_hist: number,
  perc_cresc: number,
  perc_meta_ating: number,
  perc_potencial_cresc: number
}

export async function getGlobalAnalysis() {
  const response = await api.get<GlobalAnalysisResponse[]>(
    '/analise-geral',
  )

  return response.data
}
