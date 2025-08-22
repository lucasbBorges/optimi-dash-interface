import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMeta } from "@/api/delete-goal";

export function useDeleteMeta() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteMeta(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["metas-slice"] });
    },
  });
}