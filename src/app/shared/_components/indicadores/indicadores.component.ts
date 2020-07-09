import { FiltroFranqueado } from './../../models/filtro-indicadores.model';
import { FranqueadosService } from './../../../core/services/dashboards/franqueados.service';
import { HelperService } from './../../../core/services/helper.service';
import { Component, OnInit, Input } from '@angular/core';
import { IFaturamento } from '../../interfaces/faturamento.interface';

@Component({
  selector: 'ft-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.scss'],
})
export class IndicadoresComponent implements OnInit {
  @Input() codigoFranqueado = 0;

  public month: string;
  public filtroFranqueado = new FiltroFranqueado(this.codigoFranqueado);
  public faturamento: IFaturamento;

  constructor(
    private _helperService: HelperService,
    public franqueadosService: FranqueadosService
  ) {}

  ngOnInit(): void {
    this.month = this._helperService.getReferenceMonth();

    this.franqueadosService
      .getFaturamento(this.filtroFranqueado)
      .subscribe((data) => {
        this.faturamento = data;
      });
  }
}
