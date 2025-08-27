export interface GetReceiptCUResponse {
  estado: String,
  metaFaturamentoComparativoDTO: {
    faturamentoAnoAtual: number,
    faturamentoAnoAnterior: number,
    meta: number
  }
}

export interface GetReceiptResponse {
  estado: String,
  metaFaturamento: {
    faturamento: number,
    meta: number
  }
}

export type BadAreas = {
  praca: string,
  percentMetaAtingida: number;
}