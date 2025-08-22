import { GetAvertHistoryReceiptResponse } from "@/api/get-avert-history-receipt";

export type Estado = 'RS' | 'SC'
export type TotalPorEstado = Record<Estado, { faturamento: number; positivacao: number }>;
export type TotalReduceAvert = {
  estado: string
  posit: number
  fat: number
}

export type Historico = {
  date: string,
  fat: number,
  posit: number
}

export type HistoricoPorEstado = {
  historicoRS: Historico[]
  historicoSC: Historico[]
}

export const currencyFormat = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export function reduce(receipt: GetAvertHistoryReceiptResponse[]): TotalReduceAvert[] {
    const total: TotalReduceAvert[] = []
    const totalRs: TotalReduceAvert = {estado: 'RS', posit: 0, fat: 0}
    const totalSc: TotalReduceAvert = {estado: 'SC', posit: 0, fat: 0}

    receipt.forEach((receita) => {
      receita.agregacaoPorEstadoAvert.forEach(agregadoPorEstado => {
        if (agregadoPorEstado.estado === 'RS') {
          totalRs.fat += agregadoPorEstado.faturamentoPositivacaoDTO.faturamento
          totalRs.posit += agregadoPorEstado.faturamentoPositivacaoDTO.positivacao
        } else {
          totalSc.fat += agregadoPorEstado.faturamentoPositivacaoDTO.faturamento
          totalSc.posit += agregadoPorEstado.faturamentoPositivacaoDTO.positivacao
        }
      });
    })

    total.push(totalRs)
    total.push(totalSc)

    return total
}

export function calcTotalPositOrFat (total: TotalReduceAvert[] | undefined, estado: string): 
  number | undefined | string {
  if (!total) return undefined
  for (const totalPorEstado of total) {
    if (totalPorEstado.estado === estado) {
      return currencyFormat.format(totalPorEstado.fat);
    }
  }
}

export function generateAvertRevenueChartData (monthReceipt: GetAvertHistoryReceiptResponse[] | undefined) {
  if (!monthReceipt) return undefined
  const historicoRS: Historico[] = []
  const historicoSC: Historico[] = []

  monthReceipt.forEach(diaVenda => {
    const diaVendaRS: Historico = {date: diaVenda.data.toString(), posit: 0, fat: 0}
    const diaVendaSC: Historico = {date: diaVenda.data.toString(), posit: 0, fat: 0}

    diaVenda.agregacaoPorEstadoAvert.forEach(diaVendaPorEstado => {
      if(diaVendaPorEstado.estado === 'RS') {
        diaVendaRS.fat = diaVendaPorEstado.faturamentoPositivacaoDTO.faturamento
        diaVendaRS.posit = diaVendaPorEstado.faturamentoPositivacaoDTO.positivacao
      } else {
        diaVendaSC.fat = diaVendaPorEstado.faturamentoPositivacaoDTO.faturamento
        diaVendaSC.posit = diaVendaPorEstado.faturamentoPositivacaoDTO.positivacao
      }
    })
    historicoRS.push(diaVendaRS)
    historicoSC.push(diaVendaSC)
  })
  return {historicoRS: historicoRS, historicoSC: historicoSC}
}