import { IVendasHistorico } from './../../../shared/interfaces/vendas-historico.interface';
import { IVendasTopProdutos } from './../../../shared/interfaces/vendas-top-produtos.interface';
import { IVendasAcumuladas } from './../../../shared/interfaces/vendas-acumuladas.interface';
import { IVendasTipoPagamento } from './../../../shared/interfaces/vendas-tipo-pagamento.interface';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IVendasMensal } from 'src/app/shared/interfaces/vendas-mensal.interface';

@Injectable({
  providedIn: 'root',
})
export class FranqueadosService {
  constructor(private http: HttpClient) {}

  getVendasTipoPagamento(): Observable<IVendasTipoPagamento> {
    return this.http.get<IVendasTipoPagamento>(
      `${environment.API.URL}${environment.API.Routes.dashboards.franqueados.vendasTipoPagamento}`
    );
  }

  getVendasMensal(): Observable<IVendasMensal> {
    return this.http.get<IVendasMensal>(
      `${environment.API.URL}${environment.API.Routes.dashboards.franqueados.vendasMensal}`
    );
  }

  getVendasAcumuladas(): Observable<IVendasAcumuladas> {
    return this.http.get<IVendasAcumuladas>(
      `${environment.API.URL}${environment.API.Routes.dashboards.franqueados.vendasAcumuladas}`
    );
  }

  getVendasTopProdutos(): Observable<IVendasTopProdutos> {
    return this.http.get<IVendasTopProdutos>(
      `${environment.API.URL}${environment.API.Routes.dashboards.franqueados.vendasTopProdutos}`
    );
  }

  getVendasHistorico(): Observable<IVendasHistorico> {
    return this.http.get<IVendasHistorico>(
      `${environment.API.URL}${environment.API.Routes.dashboards.franqueados.vendasHistorico}`
    );
  }
}
