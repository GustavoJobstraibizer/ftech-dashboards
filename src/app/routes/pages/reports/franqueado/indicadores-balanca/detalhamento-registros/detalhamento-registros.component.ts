import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { BsModalRef } from 'ngx-bootstrap/modal'
import { FranqueadosService } from './../../../../../../core/services/dashboards/franqueados.service'
import { IDetalhamentoRegistrosBalanca } from './../../../../../../shared/interfaces/detalhamento-registros-balanca.interface'

@Component({
  selector: 'ft-detalhamento-registros',
  templateUrl: './detalhamento-registros.component.html',
  styleUrls: ['./detalhamento-registros.component.scss'],
})
export class DetalhamentoRegistrosComponent implements OnInit {
  detalhamentoRegistrosBalanca: IDetalhamentoRegistrosBalanca[]

  inputSearch = new FormControl('')
  public checkFilters = {
    pesadoVendido: false,
    estorno: true,
    sistemaFechado: false,
  }

  constructor(
    public franqueadoService: FranqueadosService,
    public bsModalRef: BsModalRef
  ) {}

  ngOnInit(): void {
    this.getDetalhamentoRegistrosBalanca()
  }

  getDetalhamentoRegistrosBalanca() {
    this.franqueadoService
      .getDetalhamentoRegistrosBalanca()
      .subscribe((response) => {
        this.detalhamentoRegistrosBalanca = response
      })
  }

  closeModal() {
    this.bsModalRef.hide()
  }
}
