export const ApiRoutes = {
  auth: {
    signin: {
      post: 'portal/autenticacao/login',
    },
    refresh: {
      post: 'portal/autenticacao/refresh',
    },
  },
  dashboards: {
    franqueados: {
      faturamento: 'dashboards/franqueados/faturamento',
      vendasTipoPagamento: 'dashboards/franqueados/vendasTipoPagamento',
      vendasMensal: 'dashboards/franqueados/vendasMensal',
      vendasAcumuladas: 'dashboards/franqueados/vendasAcumuladas',
      vendasTopProdutos: 'dashboards/franqueados/vendasTopProdutos',
      vendasHistorico: 'dashboards/franqueados/vendasHistorico',
      vendasPorHora: 'dashboards/franqueados/vendasPorHora',
      vendasPorCategoriaProduto:
        'dashboards/franqueados/vendasPorCategoriaProduto',
      vendasFranqueado: 'dashboards/franqueados/vendasFranqueado',
      vendasFranqueadoDetalhado:
        'dashboards/franqueados/VendasFranqueadoDetalhado',
      vendasConsumoInterno: 'dashboards/franqueados/vendasConsumoInterno',
      vendasConsumoInternoDetalhado:
        'dashboards/franqueados/vendasConsumoInternoDetalhado',
    },
  },
  adm: {
    listaPessoaFranqueado:
      'administracao/franqueados/recuperarListaPessoaFranqueadoPerfil',
  },
};
