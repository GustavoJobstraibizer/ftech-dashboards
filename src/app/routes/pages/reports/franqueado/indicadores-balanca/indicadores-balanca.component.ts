import { AfterViewInit, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize, take } from 'rxjs/operators';
import { EFiltroTipoBalanca } from 'src/app/shared/enums/filtro-tipo-balanca.enum';
import { ITipoFiltroBalanca } from 'src/app/shared/interfaces/tipo-filtro-balanca.interface';
import { IResumoBalancaTotalizador } from '../../../../../shared/interfaces/resumo-balanca-totalizador.interface';
import { AbstractFilters } from '../abstract-filters';
import { BalancaService } from './../../../../../core/services/dashboards/balanca.service';
import { IResumoBalanca } from './../../../../../shared/interfaces/resumo-balanca.interface';
import { PaginaFranqueado } from './../../../../../shared/models/pagina-franquado.model';
import { PeriodoComponent } from './../../../../../shared/_components/filter/periodo/periodo.component';
import { DetalhamentoRegistrosComponent } from './detalhamento-registros/detalhamento-registros.component';

@Component({
  selector: 'ft-indicadores-balanca',
  templateUrl: './indicadores-balanca.component.html',
  styleUrls: ['./indicadores-balanca.component.scss'],
})
export class IndicadoresBalancaComponent extends AbstractFilters<IResumoBalanca>
  implements OnInit, AfterViewInit {
  resumoBalancaTotal: IResumoBalancaTotalizador
  bsModalRef: BsModalRef
  public loading = false

  pagina = new PaginaFranqueado()

  @ViewChild('filters') filters: PeriodoComponent

  constructor(public injector: Injector, public modalService: BsModalService, public balancaService: BalancaService) {
    super(injector)
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.filters.periodoFilterOnInitEmit
      .pipe(take(1))
      .subscribe(({ dataInicio, dataFim, codigoFranqueado }) => {
        this.periodo.dataInicio = dataInicio
        this.periodo.dataFim = dataFim
        this.periodo.codigoFranqueado = codigoFranqueado
        this.getContentFromPeriodo()
        this.getIndicadoresBalanca()
      })
  }

  getContentFromPeriodo(): void {
    this.pagina.codigoFranqueado = this.periodo.codigoFranqueado
    this.pagina.dataInicio = this.periodo.dataInicio
    this.pagina.dataFim = this.periodo.dataFim
    this.balancaService
      .getResumoBalanca(this.pagina)
      .subscribe((response) => {
        this.listResult = response
      })
  }

  getIndicadoresBalanca() {
    this.loading = true
    this.balancaService
      .getResumoBalancaTotalizador(this.periodo)
      .pipe(take(1), finalize(() => this.loading = false))
      .subscribe((response: IResumoBalancaTotalizador) => {
        this.resumoBalancaTotal = response
      })
  }

  filtroPeriodo(filter: any) {
    this.periodo = filter
    this.listResult = []
    this.getContentFromPeriodo()
    this.getIndicadoresBalanca()
  }

  openModalDetalhesBalanca(filtroTipo: EFiltroTipoBalanca) {
    const initialState = {
      perido: this.periodo,
      checkFilters: this.tipoFiltroBalanca(filtroTipo)
    }

    this.bsModalRef = this.modalService.show(DetalhamentoRegistrosComponent, {
      initialState,
      class: 'modal-detalhamento-registros-balanca',
    })
  }

  tipoFiltroBalanca(filtroTipo: EFiltroTipoBalanca) {
    const checkFilters: ITipoFiltroBalanca = {
      venda: false,
      estorno: false,
      offline: false
    }
    checkFilters[filtroTipo] = true
    return checkFilters
  }

  get eFiltroTipo() {
    return EFiltroTipoBalanca
  }
}
