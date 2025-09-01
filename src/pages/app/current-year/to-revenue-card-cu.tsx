import { getTotalReceiptCU } from "@/api/get-total-receipt-cu";
import { CardSkeleton } from "@/components/card-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { ArrowBigDown, ArrowBigUp, DollarSign, Loader2 } from "lucide-react";

export function ToRevenueCard() {
    const { data: monthReceipt, isFetching: isLoadingMonthReceipt } = useQuery({
        queryKey: ['total', 'faturado-comparativo-card'],
        queryFn: getTotalReceiptCU,
      })
    
      const monthReceiptTo = monthReceipt?.find(receipt => receipt.estado === 'TO');
        return (
            <Card>
                <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-base font-semibold">Receita total TO (ano)</CardTitle>
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
                        {monthReceiptTo?.metaFaturamentoComparativoDTO.faturamentoAnoAtual == null ? '-':
                         monthReceiptTo?.metaFaturamentoComparativoDTO.faturamentoAnoAtual.toLocaleString('pt-BR', {
                            currency: 'BRL',
                            style: 'currency',
                        })}
                        </span>
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    <span>Faturado ano anterior: </span> 
                                    <span className="font-bold text-white">
                                        {monthReceiptTo?.metaFaturamentoComparativoDTO.faturamentoAnoAnterior == null ? '-':
                                        monthReceiptTo?.metaFaturamentoComparativoDTO.faturamentoAnoAnterior.toLocaleString('pt-BR', {
                                            currency: 'BRL',
                                            style: 'currency',
                                        })}
                                    </span>
                                </p>
                                <p className="text-xs text-muted-foreground">
                                <span
                                    className={'text-white font-bold'}
                                >
                                    {monthReceiptTo?.metaFaturamentoComparativoDTO?.faturamentoAnoAtual !== undefined &&
                                    monthReceiptTo?.metaFaturamentoComparativoDTO?.meta !== undefined &&
                                    monthReceiptTo.metaFaturamentoComparativoDTO.meta !== 0 ? (
                                    ((monthReceiptTo.metaFaturamentoComparativoDTO.faturamentoAnoAtual * 100) /
                                        monthReceiptTo.metaFaturamentoComparativoDTO.meta).toFixed(2) + '%'
                                    ) : (
                                    '--'
                                    )}
                                </span>{' '}
                                da meta
                                </p>
                            </div>
                            <div>
                                {monthReceiptTo == undefined ? "" : 
                                monthReceiptTo?.metaFaturamentoComparativoDTO.faturamentoAnoAtual > 
                                monthReceiptTo?.metaFaturamentoComparativoDTO.faturamentoAnoAnterior ? 
                                <ArrowBigUp className=" text-green-800"/> : 
                                <ArrowBigDown className=" text-red-800"/>}
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