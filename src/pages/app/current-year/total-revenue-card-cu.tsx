import { getTotalReceiptCU } from "@/api/get-total-receipt-cu";
import { CardSkeleton } from "@/components/card-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { ArrowBigDown, ArrowBigUp, DollarSign, Loader2 } from "lucide-react";

type Resultado = {
  faturamentoAnoAtual: number;
  faturamentoAnoAnterior: number;
  meta: number;
};


export function TotalRevenueCard() {
    const { data: monthReceipt, isFetching: isLoadingMonthReceipt } = useQuery({
            queryKey: ['total', 'faturado-comparativo-card'],
            queryFn: getTotalReceiptCU,
          })

    const resultado: Resultado = monthReceipt?.reduce<Resultado>(
        (acc, item) => {
            acc.faturamentoAnoAtual += item.metaFaturamentoComparativoDTO.faturamentoAnoAtual;
            acc.faturamentoAnoAnterior += item.metaFaturamentoComparativoDTO.faturamentoAnoAnterior;
            acc.meta += item.metaFaturamentoComparativoDTO.meta;
            return acc;
        },
        { faturamentoAnoAtual: 0, faturamentoAnoAnterior: 0, meta: 0 }
    ) ?? { faturamentoAnoAtual: 0, faturamentoAnoAnterior: 0, meta: 0 };

    const { meta, faturamentoAnoAtual, faturamentoAnoAnterior } = resultado;
    
    return (
        <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-semibold">Receita total (ano)</CardTitle>
                {isLoadingMonthReceipt ? (
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                ) : (
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                )}
            </CardHeader>
            <CardContent className="space-y-1">
                {monthReceipt ? (
                <>
                    <span className="text-2xl font-bold">
                    {faturamentoAnoAtual == null ? '-' :
                     faturamentoAnoAtual.toLocaleString('pt-BR', {
                        currency: 'BRL',
                        style: 'currency',
                    })}
                    </span>
                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-xs text-muted-foreground">
                                <span>Faturado ano anterior: </span>
                                <span className="font-bold text-white">
                                    {faturamentoAnoAnterior == null ? '-' :
                                    faturamentoAnoAnterior.toLocaleString('pt-BR', {
                                        currency: 'BRL',
                                        style: 'currency',
                                    })}
                                </span>
                            </p>
                            <p className="text-xs text-muted-foreground">
                            <span
                                className={'text-white font-bold'}
                            >
                                {faturamentoAnoAtual !== undefined &&
                                meta !== undefined &&
                                meta !== 0 ? (
                                ((faturamentoAnoAtual * 100) /
                                    meta).toFixed(2) + '%'
                                ) : (
                                '--'
                                )}
                            </span>{' '}
                            da meta
                            </p>
                        </div>
                        <div>
                            {faturamentoAnoAtual > faturamentoAnoAnterior ? 
                            <ArrowBigUp className="text-muted-foreground text-green-800"/> : 
                            <ArrowBigDown className="text-muted-foreground text-red-800"/>}
                        </div>
                    </div>
                </>
                ) : (
                <CardSkeleton />
                )}
            </CardContent>
        </Card>
    )
}