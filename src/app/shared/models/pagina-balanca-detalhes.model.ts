import { PaginaFranqueado } from './pagina-franquado.model';

export class PaginaBalancaDetalhes extends PaginaFranqueado {

  private _venda = false
  private _estorno = false
  private _offline = false

  constructor() {
    super();
  }

  get venda() {
    return this._venda
  }

  set venda(venda: boolean) {
    this._venda = venda
  }

  get estorno() {
    return this._estorno
  }

  set estorno(estorno: boolean) {
    this._estorno = estorno
  }

  get offline() {
    return this._offline
  }

  set offline(offline: boolean) {
    this._offline = offline
  }

  searchParamsBalanca() {
    return new URLSearchParams({
      venda: this.venda.toString(),
      estorno: this.estorno.toString(),
      offline: this.offline.toString(),
    }).toString()
  }

}
