import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { finalize, take } from 'rxjs/operators'
import { IPeriodoBusca } from 'src/app/shared/interfaces/periodo-busca.interface'
import { IVendasFranqueado } from 'src/app/shared/interfaces/vendas-franqueado.interface'
import { FranqueadosService } from './../../../../../core/services/dashboards/franqueados.service'
import { PeriodoComponent } from './../../../../../shared/_components/filter/periodo/periodo.component'
import { ItensComponent } from './itens/itens.component'

@Component({
  selector: 'ft-detalhamento-vendas',
  templateUrl: './detalhamento-vendas.component.html',
  styleUrls: ['./detalhamento-vendas.component.scss'],
})
export class DetalhamentoVendasComponent implements OnInit, AfterViewInit {
  public periodo: IPeriodoBusca = {
    dataInicio: null,
    dataFim: null,
    codigoFranqueado: 0,
  }

  bsModalRef: BsModalRef
  public vendasFranqueado: IVendasFranqueado[] = []
  public vendasFranqueadoTotal: any[] = []
  public showItemsOnDesktopVersion = window.innerWidth >= 768
  public loading = false

  @ViewChild('filters') filters: PeriodoComponent

  constructor(
    public franqueadosService: FranqueadosService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.filters.periodoFilterOnInitEmit
      .pipe(take(1))
      .subscribe(({ dataInicio, dataFim, codigoFranqueado }) => {
        this.periodo.dataInicio = dataInicio
        this.periodo.dataFim = dataFim
        this.periodo.codigoFranqueado = codigoFranqueado
        this.getVendasFranqueado()
      })
  }

  getVendasFranqueado() {
    this.loading = true
    this.franqueadosService
      .getVendasFranqueado(
        this.periodo.dataInicio,
        this.periodo.dataFim,
        this.periodo.codigoFranqueado
      )
      .pipe(
        take(1),
        finalize(() => (this.loading = false))
      )
      .subscribe((response) => {
        this.vendasFranqueado = response

        this.vendasFranqueado = this.vendasFranqueado.filter(
          (venda) => !venda.Total
        )
        response.forEach((v) => {
          if (v.Total && v.Data != '%') {
            this.vendasFranqueadoTotal.push(v)
          }
        })
      })
  }

  filtroPeriodo(filter: any) {
    this.periodo = filter
    this.vendasFranqueadoTotal = []
    this.getVendasFranqueado()
  }

  filtroPeriodoOnInit(filter: any) {
    this.periodo = filter
    this.vendasFranqueadoTotal = []
    this.getVendasFranqueado()
  }

  openModalItens(codigoDocumento: string) {
    const initialState = {
      codigoDocumento,
    }
    this.bsModalRef = this.modalService.show(ItensComponent, {
      initialState,
      class: 'modal-itens-detalhe',
    })
  }
}
