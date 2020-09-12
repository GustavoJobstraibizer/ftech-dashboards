import { Component, Injector, OnInit } from '@angular/core'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { AbstractFilters } from '../abstract-filters'
import { IIndicadoresBalanca } from './../../../../../shared/interfaces/indicadores-balanca.interface'
import { DetalhamentoRegistrosComponent } from './detalhamento-registros/detalhamento-registros.component'

@Component({
  selector: 'ft-indicadores-balanca',
  templateUrl: './indicadores-balanca.component.html',
  styleUrls: ['./indicadores-balanca.component.scss'],
})
export class IndicadoresBalancaComponent extends AbstractFilters<any>
  implements OnInit {
  indicadorBalanca: IIndicadoresBalanca
  bsModalRef: BsModalRef

  constructor(public injector: Injector, public modalService: BsModalService) {
    super(injector)
  }

  ngOnInit(): void {
    this.getContentFromPeriodo()
    this.getIndicadoresBalanca()
  }

  getContentFromPeriodo(): void {
    this.franqueadoService
      .getResumoCaixa(this.periodo)
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
    const initialState = {}
    this.bsModalRef = this.modalService.show(DetalhamentoRegistrosComponent, {
      initialState,
      class: 'modal-detalhamento-registros-balanca',
    })
  }
}
