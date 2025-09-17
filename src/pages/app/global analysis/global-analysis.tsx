import { getGlobalAnalysis } from "@/api/get-global-analysis";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { TrendingDown, TrendingUp } from "lucide-react";

export function GlobalAnalysis () {
    const { data } = useQuery({
    queryKey: ['total', 'top-fornecs'],
    queryFn: getGlobalAnalysis,
  })

    return (
          <Table>           
            <TableHeader>
              <TableRow>
                <TableHead>Praça</TableHead>
                <TableHead className="w-[200px] text-left">Média Atual (R$)</TableHead>
                <TableHead className="w-[180px] text-center">% Meta Atingida Ano</TableHead>
                <TableHead className="w-[150px] text-center">% Particip</TableHead>
                <TableHead className="w-[230px] text-left">Maior Média Histórica (R$)</TableHead>
                <TableHead className="w-[150px] text-center">% Cresc</TableHead>
              </TableRow>
            </TableHeader>
    
            <TableBody>
              {data?.map(analise => (
                <TableRow key={analise.praca}>
                  <TableCell className="font-medium">{analise.praca}</TableCell>
                  <TableCell className="text-left">
                    {analise.media_atual.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  </TableCell>
                  <TableCell className="text-center">{analise.perc_meta_ating}%</TableCell>
                  <TableCell className="text-center">{analise.perc_particip}%</TableCell>
                  <TableCell className="text-left">
                    {analise.maior_media_hist.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex gap-2 flex-row justify-center">
                        <span>{analise.perc_cresc}%</span>
                        {analise.perc_cresc > 0 ? <TrendingUp className="text-green-700" /> : <TrendingDown className="text-red-700"/>}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
      )
}