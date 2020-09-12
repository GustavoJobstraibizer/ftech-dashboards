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
    balanca: {
      resumoBalanca: 'dashboards/balanca/recuperarResumoBalanca',
      resumoBalancaDetalhes: 'dashboards/balanca/recuperarResumoBalancaDetalhes'
    }
  },
  adm: {
    listaPessoaFranqueado:
      'administracao/franqueados/recuperarListaPessoaFranqueadoPerfil',
  },
}

export const ApiRoutesDemo = {
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
      faturamento: 'demo/dashboards/franqueados/faturamento',
      vendasTipoPagamento: 'demo/dashboards/franqueados/vendasTipoPagamento',
      vendasMensal: 'demo/dashboards/franqueados/vendasMensal',
      vendasAcumuladas: 'demo/dashboards/franqueados/vendasAcumuladas',
      vendasTopProdutos: 'demo/dashboards/franqueados/vendasTopProdutos',
      vendasHistorico: 'demo/dashboards/franqueados/vendasHistorico',
      vendasPorHora: 'demo/dashboards/franqueados/vendasPorHora',
      vendasPorCategoriaProduto:
        'demo/dashboards/franqueados/vendasPorCategoriaProduto',
      vendasFranqueado: 'demo/dashboards/franqueados/vendasFranqueado',
      vendasFranqueadoDetalhado:
        'demo/dashboards/franqueados/VendasFranqueadoDetalhado',
      vendasConsumoInterno: 'demo/dashboards/franqueados/vendasConsumoInterno',
      vendasConsumoInternoDetalhado:
        'demo/dashboards/franqueados/vendasConsumoInternoDetalhado',
    },
  },
  adm: {
    listaPessoaFranqueado:
      'administracao/franqueados/recuperarListaPessoaFranqueadoPerfil',
  },
}
