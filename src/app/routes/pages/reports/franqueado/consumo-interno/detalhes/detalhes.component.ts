import { Component, OnInit } from '@angular/core'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { IPeriodoBusca } from 'src/app/shared/interfaces/periodo-busca.interface'
import { FranqueadosService } from './../../../../../../core/services/dashboards/franqueados.service'
import { IVendasConsumoInternoDetalhado } from './../../../../../../shared/interfaces/vendas-consumo-interno-detalhado.interface'
import { ItensComponent } from './../../detalhamento-vendas/itens/itens.component'

@Component({
  selector: 'ft-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.scss'],
})
export class DetalhesComponent implements OnInit {
  public periodo: IPeriodoBusca = {
    dataInicio: null,
    dataFim: null,
    codigoFranqueado: 0,
  }

  public codigoPessoa: number
  public dataInicio = ''
  public dataFim = ''
  public codigoFranqueado = 0

  public vendasConsumoInternoDetalhes: IVendasConsumoInternoDetalhado[]

  constructor(
    public franqueadosService: FranqueadosService,
    public bsModalRef2: BsModalRef,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.periodo.codigoFranqueado = this.codigoFranqueado
    this.periodo.dataInicio = this.dataInicio
    this.periodo.dataFim = this.dataFim
    this.getVendasConsumoDetalhado()
  }

  getVendasConsumoDetalhado() {
    this.franqueadosService
      .getVendasConsumoInternoDetalhado(
        this.periodo.dataInicio,
        this.periodo.dataFim,
        this.periodo.codigoFranqueado,
        this.codigoPessoa
      )
      .subscribe((data) => {
        this.vendasConsumoInternoDetalhes = data
        this.vendasConsumoInternoDetalhes = this.vendasConsumoInternoDetalhes.filter(
          (item) => item.Data != '%'
        )
      })
  }

  filtroPeriodo(filter) {
    this.periodo = filter
    this.vendasConsumoInternoDetalhes = []
    this.getVendasConsumoDetalhado()
  }

  openModalItens(codigoDocumento) {
    const initialState = {
      codigoDocumento,
    }
    this.bsModalRef2 = this.modalService.show(ItensComponent, {
      initialState,
      class: 'modal-itens-detalhe',
    })
  }

  closeModal() {
    this.modalService.hide(1)
    document.body.classList.remove('modal-open')
  }
}
