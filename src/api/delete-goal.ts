import { api } from "@/lib/axios";

export async function deleteMeta(id: number) {
  await api.delete(`/metas/${id}`); 
}