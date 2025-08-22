import { getAvertReceipt } from "@/api/get-avert-receipt";
import { CardSkeleton } from "@/components/card-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { DollarSign, Loader2 } from "lucide-react";

export function RsAvertRevenueCard() {
    const { data: monthReceipt, isFetching: isLoadingMonthReceipt } = useQuery({
    queryKey: ['avert', 'faturado-card'],
    queryFn: getAvertReceipt,
  })

  const monthReceiptRs = monthReceipt?.find(receipt => receipt.estado === 'RS1');
    return (
        <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-semibold">Receita total Avert RS (mês)</CardTitle>
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
                    {monthReceiptRs?.metaFaturamento.faturamento == null ? '-':
                     monthReceiptRs?.metaFaturamento.faturamento.toLocaleString('pt-BR', {
                        currency: 'BRL',
                        style: 'currency',
                    })}
                    </span>
                    <p className="text-xs text-muted-foreground">
                    <span
                        className={'text-white font-bold'}
                    >
                        {monthReceiptRs?.metaFaturamento?.faturamento !== undefined &&
                        monthReceiptRs?.metaFaturamento?.meta !== undefined &&
                        monthReceiptRs.metaFaturamento.meta !== 0 ? (
                        ((monthReceiptRs.metaFaturamento.faturamento * 100) /
                            monthReceiptRs.metaFaturamento.meta).toFixed(2) + '%'
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