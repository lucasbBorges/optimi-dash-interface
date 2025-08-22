// src/hooks/useMetaSlice.ts
import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMetaSlice, GetMetaSliceParams } from "@/api/get-goals";

export function useMetaSlice(params: GetMetaSliceParams) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["metas-slice", params], 
    queryFn: () => getMetaSlice(params),
    placeholderData: (prev) => prev         
  });
  useEffect(() => {
    if (query.data?.hasNext) {
      const nextParams = { ...params, page: (params.page ?? 0) + 1 };
      queryClient.prefetchQuery({
        queryKey: ["metas-slice", nextParams],
        queryFn: () => getMetaSlice(nextParams),
      });
    }
  }, [query.data?.hasNext, params, queryClient]);

  return query;
}
