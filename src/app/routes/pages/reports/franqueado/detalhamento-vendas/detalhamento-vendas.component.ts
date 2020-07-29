import { Component, OnInit } from '@angular/core'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { IPeriodoBusca } from 'src/app/shared/interfaces/periodo-busca.interface'
import { IVendasFranqueado } from 'src/app/shared/interfaces/vendas-franqueado.interface'
import { FranqueadosService } from './../../../../../core/services/dashboards/franqueados.service'
import { ItensComponent } from './itens/itens.component'

@Component({
  selector: 'ft-detalhamento-vendas',
  templateUrl: './detalhamento-vendas.component.html',
  styleUrls: ['./detalhamento-vendas.component.scss'],
})
export class DetalhamentoVendasComponent implements OnInit {
  public periodo: IPeriodoBusca = {
    dataInicio: null,
    dataFim: null,
    codigoFranqueado: 0,
  }

  bsModalRef: BsModalRef
  public vendasFranqueado: IVendasFranqueado[] = []
  public vendasFranqueadoTotal: any[] = []
  public showItemsOnDesktopVersion = window.innerWidth >= 768

  constructor(
    public franqueadosService: FranqueadosService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.getVendasFranqueado()
  }

  getVendasFranqueado() {
    this.franqueadosService
      .getVendasFranqueado(
        this.periodo.dataInicio,
        this.periodo.dataFim,
        this.periodo.codigoFranqueado
      )
      .subscribe((response) => {
        this.vendasFranqueado = response
        this.vendasFranqueado = this.vendasFranqueado.filter(
          (venda) => !venda.Total
        )
        response.forEach((v) => {
          if (v.Total) {
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
