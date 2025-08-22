import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MetaAlterInput, putMeta } from "@/api/put-goal";

export function useUpdateMetaValor() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (args: { id: number; body: MetaAlterInput }) =>
      putMeta(args.id, args.body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["metas-slice"] });
    },
  });
}