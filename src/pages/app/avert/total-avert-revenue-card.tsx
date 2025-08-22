import { getAvertReceipt } from "@/api/get-avert-receipt";
import { CardSkeleton } from "@/components/card-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { DollarSign, Loader2 } from "lucide-react";

export function TotalAvertRevenueCard() {
    const { data: monthReceipt, isFetching: isLoadingMonthReceipt } = useQuery({
    queryKey: ['avert', 'faturado-card'],
    queryFn: getAvertReceipt,
  })
  const inicial = { somaFaturamento: 0, somaMeta: 0 };

    const totais = monthReceipt?.reduce((acumulador, atual) => {
        const { faturamento, meta } = atual.metaFaturamento || {};
        return {
            somaFaturamento: acumulador.somaFaturamento + (faturamento ?? 0),
            somaMeta: acumulador.somaMeta + (meta ?? 0),
        };
        }, inicial) ?? inicial;

    const { somaMeta, somaFaturamento } = totais;
    
    return (
        <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-semibold">Receita total Avert (mês)</CardTitle>
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
                    {somaFaturamento == null ? '-' :
                     somaFaturamento.toLocaleString('pt-BR', {
                        currency: 'BRL',
                        style: 'currency',
                    })}
                    </span>
                    <p className="text-xs text-muted-foreground">
                    <span
                        className={'text-white font-bold'}
                    >
                        {somaFaturamento !== undefined &&
                        somaMeta !== undefined &&
                        somaMeta !== 0 ? (
                        ((somaFaturamento * 100) /
                            somaMeta).toFixed(2) + '%'
                        ) : (
                        '--'
                        )}
                    </span>{' '}
                    da meta
                    </p>
                </>
                ) : (
                <CardSkeleton />
                )}
            </CardContent>
        </Card>
    )
}