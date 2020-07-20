import { PeriodoComponent } from './../../../../../../shared/_components/filter/periodo/periodo.component';
import { ItensComponent } from './../../detalhamento-vendas/itens/itens.component';
import { IVendasConsumoInternoDetalhado } from './../../../../../../shared/interfaces/vendas-consumo-interno-detalhado.interface';
import { FranqueadosService } from './../../../../../../core/services/dashboards/franqueados.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IPeriodoBusca } from 'src/app/shared/interfaces/periodo-busca.interface';
import * as moment from 'moment/moment';

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
  };

  public codigoPessoa: number;
  public dataInicio = '';
  public dataFim = '';
  public codigoFranqueado = 0;

  @ViewChild('cmpnentfiltroPeriodo', { static: true })
  cmpnentfiltroPeriodo: PeriodoComponent;

  public vendasConsumoInternoDetalhes: IVendasConsumoInternoDetalhado[];

  constructor(
    public franqueadosService: FranqueadosService,
    public bsModalRef2: BsModalRef,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.cmpnentfiltroPeriodo.formPeriodo
      .get('dataInicio')
      .setValue(moment(this.dataInicio, 'MM/DD/YYYY').format('DD/MM/YYYY'));
    this.cmpnentfiltroPeriodo.formPeriodo
      .get('dataFim')
      .setValue(moment(this.dataFim, 'MM/DD/YYYY').format('DD/MM/YYYY'));
    this.cmpnentfiltroPeriodo.formPeriodo
      .get('codigoFranqueado')
      .setValue(this.codigoFranqueado);

    this.cmpnentfiltroPeriodo.handleFilter();
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
        this.vendasConsumoInternoDetalhes = data;
      });
  }

  filtroPeriodo(filter) {
    this.periodo = filter;
    this.vendasConsumoInternoDetalhes = [];
    this.getVendasConsumoDetalhado();
  }

  openModalItens(codigoDocumento) {
    const initialState = {
      codigoDocumento,
    };
    this.bsModalRef2 = this.modalService.show(ItensComponent, {
      initialState,
      class: 'modal-lg',
    });
  }

  closeModal() {
    this.modalService.hide(1);
  }
}
