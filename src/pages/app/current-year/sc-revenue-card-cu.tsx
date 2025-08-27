import { getTotalReceiptCU } from "@/api/get-total-receipt-cu";
import { CardSkeleton } from "@/components/card-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { ArrowBigDown, ArrowBigUp, DollarSign, Loader2 } from "lucide-react";

export function ScRevenueCard() {
    const { data: monthReceipt, isFetching: isLoadingMonthReceipt } = useQuery({
        queryKey: ['total', 'faturado-comparativo-card'],
        queryFn: getTotalReceiptCU,
      })
    
      const monthReceiptSc = monthReceipt?.find(receipt => receipt.estado === 'SC1');
        return (
            <Card>
                <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-base font-semibold">Receita total SC (ano)</CardTitle>
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
                        {monthReceiptSc?.metaFaturamentoComparativoDTO.faturamentoAnoAtual == null ? '-':
                         monthReceiptSc?.metaFaturamentoComparativoDTO.faturamentoAnoAtual.toLocaleString('pt-BR', {
                            currency: 'BRL',
                            style: 'currency',
                        })}
                        </span>
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    <span>Faturado ano anterior: </span> 
                                    <span className="font-bold text-white">
                                        {monthReceiptSc?.metaFaturamentoComparativoDTO.faturamentoAnoAnterior == null ? '-':
                                        monthReceiptSc?.metaFaturamentoComparativoDTO.faturamentoAnoAnterior.toLocaleString('pt-BR', {
                                            currency: 'BRL',
                                            style: 'currency',
                                        })}
                                    </span>
                                </p>
                                <p className="text-xs text-muted-foreground">
                                <span
                                    className={'text-white font-bold'}
                                >
                                    {monthReceiptSc?.metaFaturamentoComparativoDTO?.faturamentoAnoAtual !== undefined &&
                                    monthReceiptSc?.metaFaturamentoComparativoDTO?.meta !== undefined &&
                                    monthReceiptSc.metaFaturamentoComparativoDTO.meta !== 0 ? (
                                    ((monthReceiptSc.metaFaturamentoComparativoDTO.faturamentoAnoAtual * 100) /
                                        monthReceiptSc.metaFaturamentoComparativoDTO.meta).toFixed(2) + '%'
                                    ) : (
                                    '--'
                                    )}
                                </span>{' '}
                                da meta
                                </p>
                            </div>
                            <div>
                                {monthReceiptSc == undefined ? "" : 
                                monthReceiptSc?.metaFaturamentoComparativoDTO.faturamentoAnoAtual > 
                                monthReceiptSc?.metaFaturamentoComparativoDTO.faturamentoAnoAnterior ? 
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