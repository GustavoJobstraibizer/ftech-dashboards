import { ModalPeriodoComponent } from './../../../../../shared/_components/filter/modal-periodo/modal-periodo.component';
import { PeriodoComponent } from './../../../../../shared/_components/filter/periodo/periodo.component';
import { IVendasHora } from './../../../../../shared/interfaces/vendas-hora.interface';
import { FranqueadosService } from './../../../../../core/services/dashboards/franqueados.service';
import { Component, OnInit } from '@angular/core';
import { IPeriodoBusca } from 'src/app/shared/interfaces/periodo-busca.interface';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { take } from 'rxjs/operators';

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

  public vendas: IVendasHora[];
  public bsModalRef: BsModalRef;

  constructor(
    public franqueadosService: FranqueadosService,
    public modalService: BsModalService
  ) {}

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
        this.vendas = response;
        this.vendas.map(this.ultimaLinha.bind(this));
      });
  }

  ultimaLinha(venda: IVendasHora, index: number) {
    if (index + 1 >= this.vendas.length) {
      venda.UltimaLinha = true;
      return venda;
    }

    if (index + 1 >= this.vendas.length - 1) {
      venda.PenultimaLinha = true;
      return venda;
    }
  }

  filtroPeriodo(filter: any) {
    this.periodo = filter;
    this.getVendasPorHora();
  }

  // openModalFiltros() {
  //   const initialState = {
  //     title:
  //       'Selecione um período para visualizar as vendas agredadas por horário e por dia da semana',
  //   };
  //   this.bsModalRef = this.modalService.show(ModalPeriodoComponent, {
  //     initialState,
  //     class: 'modal-centered',
  //   });

  //   this.modalService.onHidden.pipe(take(1)).subscribe((data) => {
  //     if (data && data !== 'backdrop-click') {
  //       this.periodo = JSON.parse(data);
  //       this.getVendasPorHora();
  //     }
  //   });
  // }
}
