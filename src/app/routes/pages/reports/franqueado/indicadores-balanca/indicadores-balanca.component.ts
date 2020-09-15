import { AfterViewInit, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { take } from 'rxjs/operators';
import { AbstractFilters } from '../abstract-filters';
import { BalancaService } from './../../../../../core/services/dashboards/balanca.service';
import { IIndicadoresBalanca } from './../../../../../shared/interfaces/indicadores-balanca.interface';
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
  indicadorBalanca: IIndicadoresBalanca
  bsModalRef: BsModalRef

  pagina = new PaginaFranqueado()

  @ViewChild('filters') filters: PeriodoComponent

  constructor(public injector: Injector, public modalService: BsModalService, public balancaService: BalancaService) {
    super(injector)
  }

  ngOnInit(): void {
    // this.getContentFromPeriodo()
    this.getIndicadoresBalanca()
  }

  ngAfterViewInit() {
    this.filters.periodoFilterOnInitEmit
      .pipe(take(1))
      .subscribe(({ dataInicio, dataFim, codigoFranqueado }) => {
        this.periodo.dataInicio = dataInicio
        this.periodo.dataFim = dataFim
        this.periodo.codigoFranqueado = codigoFranqueado
        this.getContentFromPeriodo()
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
    this.franqueadoService
      .getIndicadoresBalanca(this.periodo)
      .subscribe((response) => {
        this.indicadorBalanca = response
      })
  }

  openModalDetalhesBalanca() {
    const initialState = {
      perido: this.periodo
    }
    this.bsModalRef = this.modalService.show(DetalhamentoRegistrosComponent, {
      initialState,
      class: 'modal-detalhamento-registros-balanca',
    })
  }
}
