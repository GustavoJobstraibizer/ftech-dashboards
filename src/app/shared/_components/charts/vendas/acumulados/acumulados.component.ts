import * as am4charts from '@amcharts/amcharts4/charts'
import * as am4core from '@amcharts/amcharts4/core'
import am4lang_pt_BR from '@amcharts/amcharts4/lang/pt_BR'
import {
  default as am4themes_animated,
  default as am4themes_kelly,
} from '@amcharts/amcharts4/themes/animated'
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core'
import { finalize, take } from 'rxjs/operators'
import { FiltroFranqueado } from 'src/app/shared/models/filtro-indicadores.model'
import { FranqueadosService } from './../../../../../core/services/dashboards/franqueados.service'

am4core.useTheme(am4themes_kelly)
am4core.useTheme(am4themes_animated)

@Component({
  selector: 'chart-acumulados',
  templateUrl: './acumulados.component.html',
  styleUrls: ['./acumulados.component.scss'],
})
export class AcumuladosComponent implements OnInit, OnChanges, OnDestroy {
  @Input() carregarVendasAcc = false
  @Input() codigoFranqueado = 0

  public acumulados: any
  public chart: any
  public valueAxis: am4charts.ValueAxis
  public filtroFranqueado = new FiltroFranqueado(this.codigoFranqueado)
  public loading = false

  constructor(public franqueadosDashBoardsService: FranqueadosService) {}

  ngOnInit(): void {
    this.disposeChart()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.carregarVendasAcc && this.codigoFranqueado) {
      this.filtroFranqueado.codigoFranqueado = this.codigoFranqueado
      this.getVendasAcumuladas()
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

  responsiveConfig() {
    this.chart.responsive.rules.push({
      relevant: (target) => {
        if (target.pixelWidth <= 600) {
          return true
        }
        return false
      },
      state: (target, stateId) => {
        if (target instanceof am4charts.ValueAxis) {
          const state = target.states.create(stateId)

          state.properties.fontSize = 12
          return state
        }

        return null
      },
    })
  }

  getVendasAcumuladas() {
    this.disposeChart()
    this.chart = am4core.create('chartVendasAcumuladas', am4charts.XYChart)
    this.chart.language.locale = am4lang_pt_BR
    this.chart.logo.disabled = true
    this.responsiveConfig()
    this.loading = true

    this.franqueadosDashBoardsService
      .getVendasAcumuladas(this.filtroFranqueado)
      .pipe(
        take(1),
        finalize(() => (this.loading = false))
      )
      .subscribe((response) => {
        if (!response.length) return
        this.acumulados = response

        this.chart.marginRight = 400

        this.chart.data = this.acumulados

        // Create axes
        const categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis())
        categoryAxis.dataFields.category = 'Mes'
        categoryAxis.renderer.grid.template.location = 0
        categoryAxis.renderer.minGridDistance = 20

        this.valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis())

        // Create series
        const series = this.chart.series.push(new am4charts.ColumnSeries())
        series.dataFields.valueY = 'ValorAcumulado'
        series.dataFields.categoryX = 'Mes'
        series.name = 'Valor Acumulado'
        series.tooltipText = '{name}: [bold]{valueY.formatNumber("#.00")}[/]'
        series.stacked = true

        const series2 = this.chart.series.push(new am4charts.ColumnSeries())
        series2.dataFields.valueY = 'ValorVenda'
        series2.dataFields.categoryX = 'Mes'
        series2.name = 'Valor Venda'
        series2.tooltipText = '{name}: [bold]{valueY.formatNumber("#.00")}[/]'
        series2.stacked = true
        series2.stroke = am4core.color('#6fb142')
        series2.columns.template.fill = am4core.color('#6fb142')

        // Add cursor
        this.chart.cursor = new am4charts.XYCursor()
        this.chart.cursor.behavior = 'none'
      })
  }
}
