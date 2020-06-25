export interface IVendasHistorico {
  Data: {
    MediaAnoAnterior: number;
    AnoAnterior: string;
    AnoAtual: string;
    Vendas: [{ Mes: string; VendaAnoAnterior: number; VendaAnoAtual: number }];
  };
}
