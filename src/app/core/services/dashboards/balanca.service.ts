import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';
import { IResumoBalancaDetalhes } from './../../../shared/interfaces/detalhamento-registros-balanca.interface';
import { IResumoBalanca } from './../../../shared/interfaces/resumo-balanca.interface';
import { PaginaBalancaDetalhes } from './../../../shared/models/pagina-balanca-detalhes.model';
import { PaginaFranqueado } from './../../../shared/models/pagina-franquado.model';

@Injectable({
  providedIn: 'root'
})
export class BalancaService {

  constructor(private httpClient: HttpClient) { }

  getResumoBalanca(pagina: PaginaFranqueado): Observable<IResumoBalanca[]> {
    return this.httpClient.get<IResumoBalanca[]>(`${environment.API.URL}${environment.API.Routes.dashboards.balanca.resumoBalanca}?${pagina.searchParams()}${pagina.query()}`).pipe(map((data) => data['Data'] || []))
  }

  getResumoBalancaDetalhes(pagina: PaginaBalancaDetalhes): Observable<IResumoBalancaDetalhes> {
    return this.httpClient.get<IResumoBalancaDetalhes>(`${environment.API.URL}${environment.API.Routes.dashboards.balanca.resumoBalancaDetalhes}?${pagina.searchParamsBalanca()}&${pagina.searchParams()}${pagina.query()}`)
  }
}
