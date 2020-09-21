import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import * as Moment from 'moment/moment'
import { BsModalRef } from 'ngx-bootstrap/modal'
import { LazyLoadEvent } from 'primeng/api'
import {
  debounceTime,
  distinctUntilChanged,
  finalize,
  take,
} from 'rxjs/operators'
import { ITipoFiltroBalanca } from 'src/app/shared/interfaces/tipo-filtro-balanca.interface'
import { BalancaService } from './../../../../../../core/services/dashboards/balanca.service'
import { FranqueadosService } from './../../../../../../core/services/dashboards/franqueados.service'
import { IResumoBalancaDetalhes } from './../../../../../../shared/interfaces/detalhamento-registros-balanca.interface'
import { IPeriodoBusca } from './../../../../../../shared/interfaces/periodo-busca.interface'
import { PaginaBalancaDetalhes } from './../../../../../../shared/models/pagina-balanca-detalhes.model'

@Component({
  selector: 'ft-detalhamento-registros',
  templateUrl: './detalhamento-registros.component.html',
  styleUrls: ['./detalhamento-registros.component.scss'],
})
export class DetalhamentoRegistrosComponent implements OnInit {
  resumoBalancaDetalhes: IResumoBalancaDetalhes
  perido: IPeriodoBusca

  inputSearch = new FormControl('')
  checkFilters: ITipoFiltroBalanca

  public pagina = new PaginaBalancaDetalhes()
  public loading = false

  public moment = Moment

  constructor(
    public franqueadoService: FranqueadosService,
    public bsModalRef: BsModalRef,
    public balancaService: BalancaService
  ) {
    this.pagina.page = 1
  }

  ngOnInit(): void {
    this.inputSearch.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        console.log(value)
        this.filtroDetalhes()
      })

    this.pagina.dataInicio = this.perido.dataInicio
    this.pagina.dataFim = this.perido.dataFim
    this.pagina.codigoFranqueado = this.perido.codigoFranqueado
    this.filtroDetalhes()
  }

  getResumoBalancaDetalhes() {
    this.loading = true
    this.balancaService
      .getResumoBalancaDetalhes(this.pagina)
      .pipe(
        take(1),
        finalize(() => (this.loading = false))
      )
      .subscribe((response) => {
        this.resumoBalancaDetalhes = response['Data']
        this.pagina.total = response['Total']
      })
  }

  closeModal() {
    this.bsModalRef.hide()
  }

  filtroDetalhes() {
    if (this.checkFilters.todos) {
      Object.keys(this.checkFilters).map(
        (item) => (this.checkFilters[item] = true)
      )
    }
    this.pagina.venda = this.checkFilters.venda
    this.pagina.estorno = this.checkFilters.estorno
    this.pagina.offline = this.checkFilters.offline
    this.pagina.filter = `&Query=${this.inputSearch.value}`
    this.getResumoBalancaDetalhes()
  }

  loadResumoDetalhes(e: LazyLoadEvent) {
    this.pagina.page = e.first === 0 ? 1 : e.first / 10 + 1
    this.pagina.order = e.sortField
    this.pagina.sort = e.sortOrder == 1 ? 'ASC' : 'DESC'
    this.pagina.size = e.rows
    this.filtroDetalhes()
  }
}
