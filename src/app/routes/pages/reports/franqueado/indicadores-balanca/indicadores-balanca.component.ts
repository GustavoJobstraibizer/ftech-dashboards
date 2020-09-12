import { Component, Injector, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AbstractFilters } from '../abstract-filters';
import { BalancaService } from './../../../../../core/services/dashboards/balanca.service';
import { IIndicadoresBalanca } from './../../../../../shared/interfaces/indicadores-balanca.interface';
import { IResumoBalanca } from './../../../../../shared/interfaces/resumo-balanca.interface';
import { PaginaFranqueado } from './../../../../../shared/models/pagina-franquado.model';
import { DetalhamentoRegistrosComponent } from './detalhamento-registros/detalhamento-registros.component';

@Component({
  selector: 'ft-indicadores-balanca',
  templateUrl: './indicadores-balanca.component.html',
  styleUrls: ['./indicadores-balanca.component.scss'],
})
export class IndicadoresBalancaComponent extends AbstractFilters<IResumoBalanca>
  implements OnInit {
  indicadorBalanca: IIndicadoresBalanca
  bsModalRef: BsModalRef

  pagina = new PaginaFranqueado()

  constructor(public injector: Injector, public modalService: BsModalService, public balancaService: BalancaService) {
    super(injector)
  }

  ngOnInit(): void {
    this.getContentFromPeriodo()
    this.getIndicadoresBalanca()
  }

  getContentFromPeriodo(): void {
    this.pagina.codigoFranqueado = this.periodo.codigoFranqueado
    this.pagina.dataInicio = this.periodo.dataInicio
    this.pagina.dataFim = this.periodo.dataFim
    this.balancaService
      .getResumoBalanca(this.pagina)
      .subscribe((response) => {
        console.log('response ', response)
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
