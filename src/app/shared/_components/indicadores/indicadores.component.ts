import { Component, Input, OnInit } from '@angular/core'
import { finalize } from 'rxjs/operators'
import { IFaturamento } from '../../interfaces/faturamento.interface'
import { FranqueadosService } from './../../../core/services/dashboards/franqueados.service'
import { HelperService } from './../../../core/services/helper.service'
import { FiltroFranqueado } from './../../models/filtro-indicadores.model'

@Component({
  selector: 'ft-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.scss'],
})
export class IndicadoresComponent implements OnInit {
  @Input() codigoFranqueado = 0

  public month: string
  public filtroFranqueado = new FiltroFranqueado(this.codigoFranqueado)
  public faturamento: IFaturamento
  public loading = false

  constructor(
    private _helperService: HelperService,
    public franqueadosService: FranqueadosService
  ) {}

  ngOnInit(): void {
    this.month = this._helperService.getReferenceMonth()

    this.loading = true
    this.franqueadosService
      .getFaturamento(this.filtroFranqueado)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((data) => {
        this.faturamento = data
      })
  }
}
