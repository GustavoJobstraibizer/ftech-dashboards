import { Component, OnInit } from '@angular/core'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { IVendasFranqueadoDetalhes } from 'src/app/shared/interfaces/vendas-franqueado-detalhes.interface'
import { FranqueadosService } from './../../../../../../core/services/dashboards/franqueados.service'

@Component({
  selector: 'ft-itens',
  templateUrl: './itens.component.html',
  styleUrls: ['./itens.component.scss'],
})
export class ItensComponent implements OnInit {
  codigoDocumento: string

  public vendaFranqueadoDetalhes: IVendasFranqueadoDetalhes

  constructor(
    public franqueadosService: FranqueadosService,
    public bsModalRef: BsModalRef,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    if (this.codigoDocumento) {
      this.franqueadosService
        .getVendasFranqueadoDetalhado(this.codigoDocumento)
        .subscribe((response) => {
          this.vendaFranqueadoDetalhes = response['Data']
        })
    }
  }

  closeModal() {
    this.bsModalRef.hide()
    document.body.classList.remove('modal-open')
  }
}
