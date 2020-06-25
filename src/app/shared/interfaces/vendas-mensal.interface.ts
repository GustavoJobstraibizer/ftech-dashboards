export interface IVendasMensal {
  Data: {
    Media: number;
    Vendas: [{ Ano: string; Mes: string; Venda: number }];
  };
}
