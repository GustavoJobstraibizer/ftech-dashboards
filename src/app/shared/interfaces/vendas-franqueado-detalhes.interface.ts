export interface IVendasFranqueadoDetalhes {
  DescricaoTabelaPreco: string;
  ListaDetalhamentoVendaFranqueadoItens: IListaDetalhamentoVendasItens[];
  ListaDetalhamentoVendaFranqueadoFormaPagamento: IListaDetalhamentoVendaFranqueadoFormaPagamento[];
}

interface IListaDetalhamentoVendasItens {
  Item: number;
  NomeProduto: string;
  Quantidade: number;
  Preco: number;
  ValorBruto: number;
  ValorDesconto: number;
  ValorLiquido: number;
  Total: boolean;
}

interface IListaDetalhamentoVendaFranqueadoFormaPagamento {
  FormaPagamento: string;
  Valor: number;
  Total: boolean;
}
