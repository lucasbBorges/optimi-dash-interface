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