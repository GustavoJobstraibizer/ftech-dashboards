import { IVendasHora } from './../../../shared/interfaces/vendas-hora.interface';
import { IVendasHistorico } from './../../../shared/interfaces/vendas-historico.interface';
import { IVendasTopProdutos } from './../../../shared/interfaces/vendas-top-produtos.interface';
import { IVendasAcumuladas } from './../../../shared/interfaces/vendas-acumuladas.interface';
import { IVendasTipoPagamento } from './../../../shared/interfaces/vendas-tipo-pagamento.interface';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IVendasMensal } from 'src/app/shared/interfaces/vendas-mensal.interface';
import { map } from 'rxjs/operators';
import { FiltroFranqueado } from 'src/app/shared/models/filtro-indicadores.model';

@Injectable({
  providedIn: 'root',
})
export class FranqueadosService {
  constructor(private http: HttpClient) {}

  getVendasTipoPagamento(
    filtroFranqueado: FiltroFranqueado
  ): Observable<IVendasTipoPagamento> {
    return this.http.get<IVendasTipoPagamento>(
      `${environment.API.URL}${environment.API.Routes.dashboards.franqueados.vendasTipoPagamento}?ano=${filtroFranqueado.ano}&mes=${filtroFranqueado.mes}&codigoFranqueado=${filtroFranqueado.codigoFranqueado}`
    );
  }

  getVendasMensal(filtroFranqueado: FiltroFranqueado): Observable<any> {
    return this.http
      .get<IVendasMensal>(
        `${environment.API.URL}${environment.API.Routes.dashboards.franqueados.vendasMensal}?ano=${filtroFranqueado.ano}&mes=${filtroFranqueado.mes}&codigoFranqueado=${filtroFranqueado.codigoFranqueado}`
      )
      .pipe(
        map((data) => {
          const vendas = data.Data.Vendas.reduce((acc, venda) => {
            acc.push({
              Mes: `${venda.Mes}/${venda.Ano}`,
              Valor: venda.Venda,
              Media: data.Data.Media,
            });
            return acc;
          }, []);

          return vendas;
        })
      );
  }

  getVendasAcumuladas(
    filtroFranqueado: FiltroFranqueado
  ): Observable<IVendasAcumuladas> {
    return this.http.get<IVendasAcumuladas>(
      `${environment.API.URL}${environment.API.Routes.dashboards.franqueados.vendasAcumuladas}?ano=${filtroFranqueado.ano}&mes=${filtroFranqueado.mes}&codigoFranqueado=${filtroFranqueado.codigoFranqueado}`
    );
  }

  getVendasTopProdutos(
    filtroFranqueado: FiltroFranqueado
  ): Observable<IVendasTopProdutos> {
    return this.http.get<IVendasTopProdutos>(
      `${environment.API.URL}${environment.API.Routes.dashboards.franqueados.vendasTopProdutos}?ano=${filtroFranqueado.ano}&mes=${filtroFranqueado.mes}&codigoFranqueado=${filtroFranqueado.codigoFranqueado}`
    );
  }

  getVendasHistorico(filtroFranqueado: FiltroFranqueado): Observable<any> {
    return this.http
      .get<IVendasHistorico>(
        `${environment.API.URL}${environment.API.Routes.dashboards.franqueados.vendasHistorico}?ano=${filtroFranqueado.ano}&mes=${filtroFranqueado.mes}&codigoFranqueado=${filtroFranqueado.codigoFranqueado}`
      )
      .pipe(
        map((data) => {
          const historico = data.Data.Vendas.reduce((acc, venda) => {
            acc.push({
              Mes: venda.Mes,
              VendaAnoAnterior: venda.VendaAnoAnterior,
              VendaAnoAtual: venda.VendaAnoAtual,
              MediaAnoAnterior: data.Data.MediaAnoAnterior,
            });
            return acc;
          }, []);

          return {
            AnoAnterior: data.Data.AnoAnterior,
            AnoAtual: data.Data.AnoAtual,
            Vendas: historico,
          };
        })
      );
  }

  getVendasPorHora(
    dataInicio: string,
    dataFim: string,
    codigoFranqueado: number
  ): Observable<IVendasHora> {
    const queryParams = new URLSearchParams({
      dataInicio,
      dataFim,
      codigoFranqueado: codigoFranqueado.toString(),
    }).toString();
    console.log(queryParams);
    return this.http.get<IVendasHora>(
      `${environment.API.URL}${environment.API.Routes.dashboards.franqueados.vendasPorHora}?${queryParams}`
    );
  }
}
