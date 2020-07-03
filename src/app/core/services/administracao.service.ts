import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IListaFranqueadoPerfil } from 'src/app/shared/interfaces/lista-franqueado-perfil.interface';

@Injectable({
  providedIn: 'root',
})
export class AdministracaoService {
  constructor(public http: HttpClient) {}

  getListaFranqueado(): Observable<IListaFranqueadoPerfil> {
    return this.http.get<IListaFranqueadoPerfil>(
      `${environment.API.URL}${environment.API.Routes.adm.listaPessoaFranqueado}?incluirValorConsolidado=true`
    );
  }
}
