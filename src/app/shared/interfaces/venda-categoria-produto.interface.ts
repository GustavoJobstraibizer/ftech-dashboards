export interface IVendaCategoriaProduto {
  CodigoProduto: number;
  DescricaoProduto: string;
  CodigoCategoriaProduto: number;
  DescricaoCategoria: string;
  Volume: number;
  Valor: number;
  Percentual: number;
  ResultadoHorizontal: boolean;
  Categoria: boolean;
  Visible?: boolean;
  Expanded?: boolean;
}
