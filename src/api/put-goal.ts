import { api } from "@/lib/axios";

export type MetaAlterInput = {
    value: number
}

export async function putMeta(id: number, input: MetaAlterInput) {
  await api.put(`/metas/${id}`, input); 
}