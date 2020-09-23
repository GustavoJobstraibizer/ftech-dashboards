import { Component, OnInit } from '@angular/core'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { finalize, take } from 'rxjs/operators'
import { IPeriodoBusca } from 'src/app/shared/interfaces/periodo-busca.interface'
import { FranqueadosService } from './../../../../../core/services/dashboards/franqueados.service'
import { IVendasConsumoInterno } from './../../../../../shared/interfaces/vendas-consumo-interno.interface'
import { DetalhesComponent } from './detalhes/detalhes.component'

@Component({
  selector: 'ft-consumo-interno',
  templateUrl: './consumo-interno.component.html',
  styleUrls: ['./consumo-interno.component.scss'],
})
export class ConsumoInternoComponent implements OnInit {
  public periodo: IPeriodoBusca = {
    dataInicio: null,
    dataFim: null,
    codigoFranqueado: 0,
  }

  public loading = false

  public consumoInterno: IVendasConsumoInterno[] = []
  bsModalRef: BsModalRef

  constructor(
    public franqueadosService: FranqueadosService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.getVendasConsumoInterno()
  }

  getVendasConsumoInterno() {
    this.loading = true
    this.franqueadosService
      .getVendasConsumoInterno(
        this.periodo.dataInicio,
        this.periodo.dataFim,
        this.periodo.codigoFranqueado
      )
      .pipe(
        take(1),
        finalize(() => (this.loading = false))
      )
      .subscribe((data) => {
        this.consumoInterno = data
      })
  }

  filtroPeriodo(filter: any) {
    this.periodo = filter
    this.consumoInterno = []
    this.getVendasConsumoInterno()
  }

  openModalDetalhes(codigoPessoa) {
    const initialState = {
      codigoPessoa,
      dataInicio: this.periodo.dataInicio,
      dataFim: this.periodo.dataFim,
      codigoFranqueado: this.periodo.codigoFranqueado,
    }
    this.bsModalRef = this.modalService.show(DetalhesComponent, {
      initialState,
      class: 'modal-detalhes-consumo',
    })
  }
}
