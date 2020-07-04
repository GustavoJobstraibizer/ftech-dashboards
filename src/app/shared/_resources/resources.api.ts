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
      vendasTipoPagamento: 'dashboards/franqueados/vendasTipoPagamento',
      vendasMensal: 'dashboards/franqueados/vendasMensal',
      vendasAcumuladas: 'dashboards/franqueados/vendasAcumuladas',
      vendasTopProdutos: 'dashboards/franqueados/vendasTopProdutos',
      vendasHistorico: 'dashboards/franqueados/vendasHistorico',
      vendasPorHora: 'dashboards/franqueados/vendasPorHora',
      vendasPorCategoriaProduto:
        'dashboards/franqueados/vendasPorCategoriaProduto',
    },
  },
  adm: {
    listaPessoaFranqueado:
      'administracao/franqueados/recuperarListaPessoaFranqueadoPerfil',
  },
};
