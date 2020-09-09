import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { IFaturamento } from 'src/app/shared/interfaces/faturamento.interface'
import { IPeriodoBusca } from 'src/app/shared/interfaces/periodo-busca.interface'
import { IVendaCategoriaProduto } from 'src/app/shared/interfaces/venda-categoria-produto.interface'
import { IVendasFranqueadoDetalhes } from 'src/app/shared/interfaces/vendas-franqueado-detalhes.interface'
import { IVendasFranqueado } from 'src/app/shared/interfaces/vendas-franqueado.interface'
import { IVendasMensal } from 'src/app/shared/interfaces/vendas-mensal.interface'
import { FiltroFranqueado } from 'src/app/shared/models/filtro-indicadores.model'
import { environment } from './../../../../environments/environment'
import { IDetalhamentoRegistrosBalanca } from './../../../shared/interfaces/detalhamento-registros-balanca.interface'
import { IIndicadoresBalanca } from './../../../shared/interfaces/indicadores-balanca.interface'
import { IResumoCaixa } from './../../../shared/interfaces/resumo-caixa.inteface'
import { IVendasAcumuladas } from './../../../shared/interfaces/vendas-acumuladas.interface'
import { IVendasConsumoInternoDetalhado } from './../../../shared/interfaces/vendas-consumo-interno-detalhado.interface'
import { IVendasConsumoInterno } from './../../../shared/interfaces/vendas-consumo-interno.interface'
import { IVendasHistorico } from './../../../shared/interfaces/vendas-historico.interface'
import { IVendasHora } from './../../../shared/interfaces/vendas-hora.interface'
import { IVendasTipoPagamento } from './../../../shared/interfaces/vendas-tipo-pagamento.interface'
import { IVendasTopProdutos } from './../../../shared/interfaces/vendas-top-produtos.interface'

@Injectable({
  providedIn: 'root',
})
export class FranqueadosService {
  public readonly escala = 1000

  constructor(private http: HttpClient) {}

  getFaturamento(filtroFranqueado: FiltroFranqueado): Observable<IFaturamento> {
    return this.http
      .get<IFaturamento>(
        `${environment.API.URL}${environment.API.Routes.dashboards.franqueados.faturamento}?ano=${filtroFranqueado.ano}&mes=${filtroFranqueado.mes}&codigoFranqueado=${filtroFranqueado.codigoFranqueado}`
      )
      .pipe(map((response) => response['Data'] || {}))
  }

  getVendasTipoPagamento(
    filtroFranqueado: FiltroFranqueado
  ): Observable<IVendasTipoPagamento[]> {
    return this.http
      .get<IVendasTipoPagamento[]>(
        `${environment.API.URL}${environment.API.Routes.dashboards.franqueados.vendasTipoPagamento}?ano=${filtroFranqueado.ano}&mes=${filtroFranqueado.mes}&codigoFranqueado=${filtroFranqueado.codigoFranqueado}`
      )
      .pipe(map((response) => response['Data'] || []))
  }

  getVendasMensal(filtroFranqueado: FiltroFranqueado): Observable<any> {
    return this.http
      .get<IVendasMensal>(
        `${environment.API.URL}${environment.API.Routes.dashboards.franqueados.vendasMensal}?ano=${filtroFranqueado.ano}&mes=${filtroFranqueado.mes}&codigoFranqueado=${filtroFranqueado.codigoFranqueado}&escala=${this.escala}`
      )
      .pipe(
        map((data) => {
          const vendas = data.Data.Vendas.reduce((acc, venda) => {
            acc.push({
              Mes: `${
                venda.Mes.toString().length == 2
                  ? venda.Mes.toString()
                  : `0${venda.Mes.toString()}`
              }/${venda.Ano.toString().substring(2, 4)}`,
              Valor: venda.Venda,
              Media: this.dividirPelaEscala(data.Data.Media),
            })
            return acc
          }, [])

          return vendas
        })
      )
  }

  getVendasAcumuladas(
    filtroFranqueado: FiltroFranqueado
  ): Observable<IVendasAcumuladas[]> {
    return this.http
      .get<IVendasAcumuladas[]>(
        `${environment.API.URL}${environment.API.Routes.dashboards.franqueados.vendasAcumuladas}?ano=${filtroFranqueado.ano}&mes=${filtroFranqueado.mes}&codigoFranqueado=${filtroFranqueado.codigoFranqueado}&escala=${this.escala}`
      )
      .pipe(map((data) => data['Data'] || []))
  }

  getVendasTopProdutos(
    filtroFranqueado: FiltroFranqueado
  ): Observable<IVendasTopProdutos[]> {
    return this.http
      .get<IVendasTopProdutos[]>(
        `${environment.API.URL}${environment.API.Routes.dashboards.franqueados.vendasTopProdutos}?ano=${filtroFranqueado.ano}&mes=${filtroFranqueado.mes}&codigoFranqueado=${filtroFranqueado.codigoFranqueado}`
      )
      .pipe(map((data) => data['Data'] || []))
  }

  getVendasHistorico(filtroFranqueado: FiltroFranqueado): Observable<any> {
    return this.http
      .get<IVendasHistorico>(
        `${environment.API.URL}${environment.API.Routes.dashboards.franqueados.vendasHistorico}?ano=${filtroFranqueado.ano}&mes=${filtroFranqueado.mes}&codigoFranqueado=${filtroFranqueado.codigoFranqueado}&escala=${this.escala}`
      )
      .pipe(
        map((data) => {
          const historico = data.Data.Vendas.reduce((acc, venda) => {
            acc.push({
              Mes: venda.Mes,
              VendaAnoAnterior: venda.VendaAnoAnterior,
              VendaAnoAtual: venda.VendaAnoAtual,
              MediaAnoAnterior: this.dividirPelaEscala(
                data.Data.MediaAnoAnterior
              ),
            })
            return acc
          }, [])

          return {
            AnoAnterior: data.Data.AnoAnterior,
            AnoAtual: data.Data.AnoAtual,
            Vendas: historico,
          }
        })
      )
  }

  getVendasPorCategoriaProduto(
    dataInicio: string,
    dataFim: string,
    codigoFranqueado: number
  ): Observable<IVendaCategoriaProduto[]> {
    const queryParams = new URLSearchParams({
      dataInicio,
      dataFim,
      codigoFranqueado: codigoFranqueado.toString(),
    }).toString()
    return this.http
      .get<IVendaCategoriaProduto[]>(
        `${environment.API.URL}${environment.API.Routes.dashboards.franqueados.vendasPorCategoriaProduto}?${queryParams}`
      )
      .pipe(
        map((vendas) => {
          vendas['Data'].map((venda) => {
            if (!venda.Categoria) {
              venda.Visible = true
            } else {
              venda.Expanded = true
            }
            return venda
          })

          return vendas['Data']
        })
      )
  }

  getVendasFranqueado(
    dataInicio: string,
    dataFim: string,
    codigoFranqueado: number
  ): Observable<IVendasFranqueado[]> {
    const queryParams = new URLSearchParams({
      dataInicio,
      dataFim,
      codigoFranqueado: codigoFranqueado.toString(),
    }).toString()
    return this.http
      .get<IVendasFranqueado[]>(
        `${environment.API.URL}${environment.API.Routes.dashboards.franqueados.vendasFranqueado}?${queryParams}`
      )
      .pipe(
        map((vendasFranqueado) => {
          if (!vendasFranqueado['Data']) {
            return []
          }
          const vendasFranqueadoNew = vendasFranqueado['Data'].reduce(
            (acc, venda) => {
              acc.push({
                Cliente: {
                  CPFCliente: venda.CPFCliente,
                  NomeCliente: venda.NomeCliente,
                  NumeroNF: venda.NumeroNF,
                  Vendedor: venda.Vendedor,
                  Expanded: false,
                },
                CodigoDocumento: venda.CodigoDocumento,
                Data: venda.Data,
                ValorBruto: venda.ValorBruto,
                ValorDesconto: venda.ValorDesconto,
                ValorLiquido: venda.ValorLiquido,
                ResultadoHorizontal: venda.ResultadoHorizontal,
                Total: venda.Total,
              })

              return acc
            },
            []
          )

          return vendasFranqueadoNew
        })
      )
  }

  getVendasFranqueadoDetalhado(
    codigoDocumento: string
  ): Observable<IVendasFranqueadoDetalhes> {
    return this.http.get<IVendasFranqueadoDetalhes>(
      `${environment.API.URL}${environment.API.Routes.dashboards.franqueados.vendasFranqueadoDetalhado}?codigoDocumento=${codigoDocumento}`
    )
  }

  getVendasConsumoInterno(
    dataInicio: string,
    dataFim: string,
    codigoFranqueado: number
  ): Observable<IVendasConsumoInterno[]> {
    const queryParams = new URLSearchParams({
      dataInicio,
      dataFim,
      codigoFranqueado: codigoFranqueado.toString(),
    }).toString()
    return this.http
      .get<IVendasConsumoInterno[]>(
        `${environment.API.URL}${environment.API.Routes.dashboards.franqueados.vendasConsumoInterno}?${queryParams}`
      )
      .pipe(map((response) => response['Data'] || []))
  }

  getVendasConsumoInternoDetalhado(
    dataInicio: string,
    dataFim: string,
    codigoFranqueado: number,
    codigoRecebedor: number
  ): Observable<IVendasConsumoInternoDetalhado[]> {
    const queryParams = new URLSearchParams({
      dataInicio,
      dataFim,
      codigoFranqueado: codigoFranqueado.toString(),
      codigoRecebedor: codigoRecebedor.toString(),
    }).toString()
    return this.http
      .get<IVendasConsumoInternoDetalhado[]>(
        `${environment.API.URL}${environment.API.Routes.dashboards.franqueados.vendasConsumoInternoDetalhado}?${queryParams}`
      )
      .pipe(map((response) => response['Data'] || []))
  }

  getVendasPorHora(
    dataInicio: string,
    dataFim: string,
    codigoFranqueado: number
  ): Observable<IVendasHora[]> {
    const queryParams = new URLSearchParams({
      dataInicio,
      dataFim,
      codigoFranqueado: codigoFranqueado.toString(),
    }).toString()
    return this.http
      .get<IVendasHora[]>(
        `${environment.API.URL}${environment.API.Routes.dashboards.franqueados.vendasPorHora}?${queryParams}`
      )
      .pipe(map((vendas) => vendas['Data'] || []))
  }

  getResumoCaixa(periodo: IPeriodoBusca): Observable<IResumoCaixa[]> {
    return this.http.get<IResumoCaixa[]>('assets/mocks/resumo-caixa.json')
  }

  getIndicadoresBalanca(
    periodo: IPeriodoBusca
  ): Observable<IIndicadoresBalanca> {
    return this.http.get<IIndicadoresBalanca>(
      'assets/mocks/indicadores-balanca.json'
    )
  }

  getDetalhamentoRegistrosBalanca(): Observable<
    IDetalhamentoRegistrosBalanca[]
  > {
    return this.http.get<IDetalhamentoRegistrosBalanca[]>(
      'assets/mocks/detalhamento-registros-balanca.json'
    )
  }

  dividirPelaEscala(valor: number) {
    return this.escala ? valor / this.escala : valor
  }
}
