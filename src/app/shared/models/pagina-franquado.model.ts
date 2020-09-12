import { Pagina } from './pagina.model'

export class PaginaFranqueado extends Pagina {

  private _dataInicio = ''
  private _dataFim = ''
  private _codigoFranqueado = 0

  constructor() {
    super()
  }

  get dataInicio() {
    return this._dataInicio
  }

  set dataInicio(dataInicio: string) {
    this._dataInicio = dataInicio
  }

  get dataFim() {
    return this._dataFim
  }

  set dataFim(dataFim: string) {
    this._dataFim = dataFim
  }

  get codigoFranqueado() {
    return this._codigoFranqueado
  }

  set codigoFranqueado(codigoFranqueado: number) {
    this._codigoFranqueado = codigoFranqueado
  }

  searchParams() {
    return new URLSearchParams({
      dataInicio: this.dataInicio,
      dataFim: this.dataFim,
      codigoFranqueado: this.codigoFranqueado.toString(),
    }).toString()
  }

}
