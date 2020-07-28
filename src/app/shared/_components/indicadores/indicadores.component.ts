import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core'
import { finalize, take } from 'rxjs/operators'
import { IFaturamento } from '../../interfaces/faturamento.interface'
import { FranqueadosService } from './../../../core/services/dashboards/franqueados.service'
import { HelperService } from './../../../core/services/helper.service'
import { FiltroFranqueado } from './../../models/filtro-indicadores.model'

@Component({
  selector: 'ft-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.scss'],
})
export class IndicadoresComponent implements OnInit, OnChanges {
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
  }

  getFaturamento() {
    this.loading = true
    this.franqueadosService
      .getFaturamento(this.filtroFranqueado)
      .pipe(
        take(1),
        finalize(() => (this.loading = false))
      )
      .subscribe((data) => {
        this.faturamento = data
      })
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('codigoFranqueado > ', this.codigoFranqueado)
    if (this.codigoFranqueado) {
      this.filtroFranqueado.codigoFranqueado = this.codigoFranqueado
      this.getFaturamento()
    }
  }
}
