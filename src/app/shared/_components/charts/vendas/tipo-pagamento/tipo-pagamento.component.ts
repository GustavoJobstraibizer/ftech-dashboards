import * as am4charts from '@amcharts/amcharts4/charts'
import * as am4core from '@amcharts/amcharts4/core'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core'
import { finalize } from 'rxjs/operators'
import { FiltroFranqueado } from 'src/app/shared/models/filtro-indicadores.model'
import { FranqueadosService } from './../../../../../core/services/dashboards/franqueados.service'
import { IVendasTipoPagamento } from './../../../../interfaces/vendas-tipo-pagamento.interface'

am4core.useTheme(am4themes_animated)

const colors = [
  '#6fb142',
  '#4472c4',
  '#ffc54b',
  '#5f7b53',
  '#b085f5',
  '#ff6f60',
  '#63a4ff',
  '#52c7b8',
  '#80e27e',
  '#8bc34a',
]

@Component({
  selector: 'chart-tipo-pagamento',
  templateUrl: './tipo-pagamento.component.html',
  styleUrls: ['./tipo-pagamento.component.scss'],
})
export class TipoPagamentoComponent implements OnInit, OnChanges, OnDestroy {
  @Input() codigoFranqueado = 0
  public vendasTipoPagamento: IVendasTipoPagamento[]
  public filtroFranqueado = new FiltroFranqueado(this.codigoFranqueado)
  public chart: am4charts.PieChart
  public loading = false

  constructor(public franqueadosDashBoardsService: FranqueadosService) {}

  ngOnInit(): void {
    this.getVendasTipoPagto()
  }

  getVendasTipoPagto() {
    this.disposeChart()
    this.chart = am4core.create('chartTipoPagamento', am4charts.PieChart)
    this.chart.responsive.enabled = true
    this.responsiveConfig()

    this.chart.logo.disabled = true

    this.loading = true
    this.franqueadosDashBoardsService
      .getVendasTipoPagamento(this.filtroFranqueado)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((response) => {
        this.vendasTipoPagamento = response
        // this.vendasTipoPagamento.Data.map(
        //   (formPag) =>
        //     (formPag.color = am4core.color(
        //       colors[formPag.FormaPagamento]
        //         ? colors[formPag.FormaPagamento]
        //         : this.getRandomColor()
        //     ))
        // );

        // this.chart.data = []
        this.chart.data = [...this.vendasTipoPagamento]

        const pieSeries = this.chart.series.push(new am4charts.PieSeries())
        pieSeries.dataFields.value = 'Valor'
        pieSeries.dataFields.category = 'FormaPagamento'
        pieSeries.labels.template.text = '{value.percent.formatNumber("#.")}%'
        pieSeries.labels.template.align = 'center'
        pieSeries.ticks.template.length = 0
        pieSeries.ticks.template.width = 10
        pieSeries.slices.template.tooltipText =
          '{category}: R$ {value.formatNumber("#.00")}'

        pieSeries.slices.template.propertyFields.fill = 'color'

        this.chart.legend = new am4charts.Legend()
        this.chart.legend.valueLabels.template.text = '{value.category}'
        this.chart.legend.maxWidth = undefined
      })
  }

  responsiveConfig() {
    this.chart.responsive.rules.push({
      relevant: (target) => {
        if (target.pixelWidth <= 600) {
          return true
        }
        return false
      },
      state: (target, stateId) => {
        if (target instanceof am4charts.PieSeries) {
          const state = target.states.create(stateId)

          const labelState = target.labels.template.states.create(stateId)
          // labelState.properties.disabled = true

          const tickState = target.ticks.template.states.create(stateId)
          // tickState.properties.disabled = true
          return state
        }

        return null
      },
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.codigoFranqueado?.currentValue) {
      this.filtroFranqueado.codigoFranqueado =
        changes.codigoFranqueado.currentValue
      this.getVendasTipoPagto()
    }
  }

  ngOnDestroy() {
    this.disposeChart()
  }

  disposeChart() {
    if (this.chart) {
      this.chart.dispose()
    }
  }
}
