export interface IVendasFranqueado {
  CodigoDocumento: string;
  Data: string;
  ValorBruto: number;
  ValorDesconto: number;
  ValorLiquido: number;
  ResultadoHorizontal: boolean;
  Total: boolean;
  Cliente: IClienteFranqueado;
}

export interface IClienteFranqueado {
  CPFCliente: string;
  NomeCliente: string;
  NumeroNF: string;
  Vendedor: string;
  Expanded?: boolean;
}
