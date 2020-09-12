import { Injector } from '@angular/core'
import { FranqueadosService } from './../../../../core/services/dashboards/franqueados.service'
import { IPeriodoBusca } from './../../../../shared/interfaces/periodo-busca.interface'
export abstract class AbstractFilters<T> {
  public periodo: IPeriodoBusca = {
    dataInicio: null,
    dataFim: null,
    codigoFranqueado: 0,
  }

  franqueadoService: FranqueadosService
  listResult: T[]

  constructor(public injector: Injector) {
    this.franqueadoService = this.injector.get(FranqueadosService)
  }

  filtroPeriodo(filter: any) {
    this.periodo = filter
    this.listResult = []
    this.getContentFromPeriodo()
  }

  // abstract getService()
  abstract getContentFromPeriodo(): void
}
