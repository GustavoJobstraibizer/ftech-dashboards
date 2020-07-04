import { FranqueadosService } from './../../../../../core/services/dashboards/franqueados.service';
import { Component, OnInit } from '@angular/core';
import { IPeriodoBusca } from 'src/app/shared/interfaces/periodo-busca.interface';

@Component({
  selector: 'ft-vendas-categoria-produto',
  templateUrl: './vendas-categoria-produto.component.html',
  styleUrls: ['./vendas-categoria-produto.component.scss'],
})
export class VendasCategoriaProdutoComponent implements OnInit {
  public periodo: IPeriodoBusca = {
    dataInicio: null,
    dataFim: null,
    codigoFranqueado: 0,
  };

  public listaVendasPorCategoria = [];

  constructor(public franqueadoService: FranqueadosService) {}

  ngOnInit(): void {
    this.getVendasCategoriaProduto();
  }

  getVendasCategoriaProduto() {
    this.franqueadoService
      .getVendasPorCategoriaProduto(
        this.periodo.dataInicio,
        this.periodo.dataFim,
        this.periodo.codigoFranqueado
      )
      .subscribe((response) => {
        this.listaVendasPorCategoria = response;
      });
  }

  filtroPeriodo(filter: any) {
    this.periodo = filter;
    this.getVendasCategoriaProduto();
  }
}
