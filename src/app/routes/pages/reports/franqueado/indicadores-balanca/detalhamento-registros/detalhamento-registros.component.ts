import { Component, OnInit } from '@angular/core'
import { FranqueadosService } from './../../../../../../core/services/dashboards/franqueados.service'
import { IDetalhamentoRegistrosBalanca } from './../../../../../../shared/interfaces/detalhamento-registros-balanca.interface'

@Component({
  selector: 'ft-detalhamento-registros',
  templateUrl: './detalhamento-registros.component.html',
  styleUrls: ['./detalhamento-registros.component.scss'],
})
export class DetalhamentoRegistrosComponent implements OnInit {
  detalhamentoRegistrosBalanca: IDetalhamentoRegistrosBalanca[]

  constructor(public franqueadoService: FranqueadosService) {}

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

  closeModal() {}
}
