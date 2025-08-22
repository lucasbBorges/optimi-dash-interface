import { GetHillsHistoryReceiptResponse } from "@/api/get-hills-history-receipt";

export type Estado = "RS" | "SC"
export type TotalReduceHills = {
    RS: number,
    SC: number
}

type Historico = {
  date: String,
  fat: number,
}

type HistoricoPorEstado = {
  historicoRS: Historico[]
  historicoSC: Historico[]
}

export const currencyFormat = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export function reduce(receipt: GetHillsHistoryReceiptResponse[]): TotalReduceHills {
    const total: TotalReduceHills = {RS: 0, SC: 0}
    receipt.forEach(mesVenda => {
        mesVenda.faturamentoPorEstadoDTO.forEach(mesVendaPorEstado => {
            mesVendaPorEstado.estado === 'RS' ? total.RS += mesVendaPorEstado.faturamento
                                              : total.SC += mesVendaPorEstado.faturamento
        })
    })
    return total;
}

export function formatReceipt(receipt: TotalReduceHills | undefined, estado: String): string | undefined{
    if (!receipt) return undefined
    if (estado === 'RS') {
        return currencyFormat.format(receipt.RS)
    }
    return currencyFormat.format(receipt.SC)
}

export function generateHillsRevenueChartData (monthReceipt: GetHillsHistoryReceiptResponse[] | undefined):
  HistoricoPorEstado | undefined {
  if (!monthReceipt) return undefined
  const historicoRS: Historico[] = []
  const historicoSC: Historico[] = []
  
  monthReceipt.forEach(diaVenda => {
    const diaVendaRS: Historico = {date: diaVenda.date, fat: 0}
    const diaVendaSC: Historico = {date: diaVenda.date, fat: 0}

    diaVenda.faturamentoPorEstadoDTO.forEach(diaVendaPorEstado => {
        if(diaVendaPorEstado.estado === 'RS') {
            diaVendaRS.fat = diaVendaPorEstado.faturamento
        } else {
            diaVendaSC.fat = diaVendaPorEstado.faturamento
        }
    })
    historicoRS.push(diaVendaRS)
    historicoSC.push(diaVendaSC)
  })
  return {historicoRS: historicoRS, historicoSC: historicoSC}
}