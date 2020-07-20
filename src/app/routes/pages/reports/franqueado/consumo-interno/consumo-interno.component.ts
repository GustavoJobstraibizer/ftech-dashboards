import { DetalhesComponent } from './detalhes/detalhes.component';
import { IVendasConsumoInterno } from './../../../../../shared/interfaces/vendas-consumo-interno.interface';
import { FranqueadosService } from './../../../../../core/services/dashboards/franqueados.service';
import { Component, OnInit } from '@angular/core';
import { IPeriodoBusca } from 'src/app/shared/interfaces/periodo-busca.interface';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

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
  };

  public consumoInterno: IVendasConsumoInterno[] = [];
  bsModalRef: BsModalRef;

  constructor(
    public franqueadosService: FranqueadosService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.getVendasConsumoInterno();
  }

  getVendasConsumoInterno() {
    this.franqueadosService
      .getVendasConsumoInterno(
        this.periodo.dataInicio,
        this.periodo.dataFim,
        this.periodo.codigoFranqueado
      )
      .subscribe((data) => {
        this.consumoInterno = data;
      });
  }

  filtroPeriodo(filter: any) {
    this.periodo = filter;
    this.consumoInterno = [];
    this.getVendasConsumoInterno();
  }

  openModalDetalhes(codigoPessoa) {
    const initialState = {
      codigoPessoa,
      dataInicio: this.periodo.dataInicio,
      dataFim: this.periodo.dataFim,
      codigoFranqueado: this.periodo.codigoFranqueado,
    };
    this.bsModalRef = this.modalService.show(DetalhesComponent, {
      initialState,
      class: 'modal-detalhes-consumo',
    });
  }
}
