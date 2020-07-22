export class FiltroFranqueado {
  public ano?: string
  public mes?: string
  public codigoFranqueado: number

  constructor(codigoFranqueado: number, ano?: string, mes?: string) {
    this.ano = ano || new Date().getFullYear().toString()
    this.mes = mes || (new Date().getMonth() + 1).toString()
    this.codigoFranqueado = codigoFranqueado
  }
}
