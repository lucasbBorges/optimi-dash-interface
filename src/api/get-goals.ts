import { api } from "@/lib/axios";

export type MetaDto = {
  id: number;
  ano: number;
  mes: number;
  supervisor: string;
  praca: string;
  codfornec: number;
  meta: number;       
  fantasia: string;
};

export type SliceResponse<T> = {
  content: T[];
  page: number;       
  size: number;
  hasPrevious: boolean;
  hasNext: boolean;
};

export type GetMetaSliceParams = {
  page?: number;   
  size?: number;   
  ano?: number;
  mes?: number;
  supervisor?: string;
  praca?: string;
};

export async function getMetaSlice(params: GetMetaSliceParams) {
  const { page = 0, size = 20, ...filters } = params;
  const { data } = await api.get<SliceResponse<MetaDto>>("/metas/listar-meta-mes-corrente", {
    params: { page, size, ...filters },
  });
  return data; 
}