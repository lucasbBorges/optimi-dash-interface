import { api } from "@/lib/axios"
import type { MetaDto } from "./get-goals"

export type MetaCreateInput = {
  ano?: number        // opcional -> backend pode assumir corrente
  mes?: number        // opcional -> backend pode assumir corrente
  supervisor: string
  praca: string
  codfornec: number
  meta: number        // em reais (ex.: 1234.56)
}


export async function createMeta(input: MetaCreateInput) {
  const { data } = await api.post<MetaDto>("/metas", input)
  return data
}