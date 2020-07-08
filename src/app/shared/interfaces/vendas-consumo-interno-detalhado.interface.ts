export interface IVendasConsumoInternoDetalhado {
  CodigoDocumento: string;
  Data: string;
  ValorBruto: number;
  ValorDesconto: number;
  ValorLiquido: number;
  CPFCliente: string;
  NomeCliente: string;
  NumeroNF: string;
  Vendedor: string;
  ResultadoHorizontal: boolean;
  Total: boolean;
}
