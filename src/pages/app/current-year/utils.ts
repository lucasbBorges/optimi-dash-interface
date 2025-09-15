import { GetYearReceiptCompare } from "@/api/utils";

export interface GetYearReceiptCompareResolved{
    mes: string,
    faturamentoAnoAnterior: number,
    faturamentoAnoRecente: number
}


export function yearReceiptCompareResolve(receipt: GetYearReceiptCompare | undefined) : GetYearReceiptCompareResolved[] {
    if (receipt == undefined) return []
    const receiptResolved: GetYearReceiptCompareResolved[] = []
    for (let faturadoRecente of receipt.faturamentoRecente) {
        const receiptResolvedData: GetYearReceiptCompareResolved = {mes: '', faturamentoAnoAnterior: 0, faturamentoAnoRecente: 0}
        const faturadoAnterior = receipt.faturamentoPassado.find((item) => item.date === faturadoRecente.date);
        
        receiptResolvedData.mes = faturadoRecente.date
        receiptResolvedData.faturamentoAnoRecente = faturadoRecente.faturamento
        receiptResolvedData.faturamentoAnoAnterior = faturadoAnterior?.faturamento ?? 0

        receiptResolved.push(receiptResolvedData)
    }

    return receiptResolved

}