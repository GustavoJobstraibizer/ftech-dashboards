import { FranqueadosService } from './../../../../../core/services/dashboards/franqueados.service';
import { Component, OnInit } from '@angular/core';
import { IPeriodoBusca } from 'src/app/shared/interfaces/periodo-busca.interface';

@Component({
  selector: 'ft-vendas-hora',
  templateUrl: './vendas-hora.component.html',
  styleUrls: ['./vendas-hora.component.scss'],
})
export class VendasHoraComponent implements OnInit {
  public periodo: IPeriodoBusca = {
    dataInicio: null,
    dataFim: null,
    codigoFranqueado: 0,
  };

  constructor(public franqueadosService: FranqueadosService) {}

  ngOnInit(): void {
    this.getVendasPorHora();
  }

  getVendasPorHora() {
    this.franqueadosService
      .getVendasPorHora(
        this.periodo.dataInicio,
        this.periodo.dataFim,
        this.periodo.codigoFranqueado
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  filtroPeriodo(filter: any) {
    console.log(filter);
    this.periodo = filter;
    console.log('periodo >> ', this.periodo);
    this.getVendasPorHora();
  }
}
