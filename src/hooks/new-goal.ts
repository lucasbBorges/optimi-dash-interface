import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createMeta } from "@/api/post-new-goal"
import type { MetaCreateInput } from "@/api/post-new-goal"

export function useCreateMeta() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (input: MetaCreateInput) => createMeta(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["metas-slice"] })
    },
  })
}