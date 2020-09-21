import * as am4charts from '@amcharts/amcharts4/charts'
import * as am4core from '@amcharts/amcharts4/core'
import am4lang_pt_BR from '@amcharts/amcharts4/lang/pt_BR'
import {
  default as am4themes_animated,
  default as am4themes_kelly
} from '@amcharts/amcharts4/themes/animated'
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core'
import { finalize, take } from 'rxjs/operators'
import { FiltroFranqueado } from 'src/app/shared/models/filtro-indicadores.model'
import { FranqueadosService } from './../../../../../core/services/dashboards/franqueados.service'

am4core.useTheme(am4themes_animated)
am4core.useTheme(am4themes_kelly)

@Component({
  selector: 'chart-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss'],
})
export class HistoricoComponent implements OnInit, OnChanges, OnDestroy {
  @Input() carregarHistorico = false
  @Input() codigoFranqueado = 0
  @Input() filtrosPesquisa: FiltroFranqueado = new FiltroFranqueado(this.codigoFranqueado)

  public historicoVendas: any

  public chart: any
  public valueAxis: am4charts.ValueAxis
  public categoryAxis: am4charts.CategoryAxis
  public filtroFranqueado = new FiltroFranqueado(this.codigoFranqueado)
  public loading = false

  constructor(public franqueadosDashBoardsService: FranqueadosService) {}

  ngOnInit(): void {
    this.disposeChart()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.carregarHistorico && this.codigoFranqueado || this.filtrosPesquisa) {
      this.filtroFranqueado.codigoFranqueado = this.codigoFranqueado
      this.filtroFranqueado.ano = this.filtrosPesquisa.ano
      this.filtroFranqueado.mes = this.filtrosPesquisa.mes
      this.getHistoricoVendas()
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

        if (target instanceof am4charts.CategoryAxis) {
          this.categoryAxis.renderer.minGridDistance = 40
        }

        return null
      },
    })
  }

  getHistoricoVendas() {
    this.disposeChart()
    this.chart = am4core.create('chartHistoricoVendas', am4charts.XYChart)
    this.chart.language.locale = am4lang_pt_BR
    this.chart.logo.disabled = true
    // this.responsiveConfig()
    this.loading = true

    this.franqueadosDashBoardsService
      .getVendasHistorico(this.filtroFranqueado)
      .pipe(
        take(1),
        finalize(() => (this.loading = false))
      )
      .subscribe((response) => {
        if (!response?.Vendas.length) return
        this.historicoVendas = response.Vendas || []

        // this.chart.paddingRight = 400
        this.chart.data = [...this.historicoVendas]

        this.categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis())
        this.categoryAxis.dataFields.category = 'Mes'
        this.categoryAxis.renderer.grid.template.location = 0
        this.categoryAxis.renderer.minGridDistance = 10
        this.categoryAxis.renderer.labels.template.fontSize = 14

        // Eixo X
        this.chart.yAxes.push(new am4charts.ValueAxis())

        // Coluna Ano anterior
        const series = this.chart.series.push(new am4charts.ColumnSeries())
        series.dataFields.valueY = 'VendaAnoAnterior'
        series.dataFields.categoryX = 'Mes'
        series.name = response?.AnoAnterior
        series.tooltipText = '{name}: [bold]{valueY.formatNumber("#.00")}[/]'
        series.stroke = am4core.color('#818181')
        series.columns.template.fill = am4core.color('#818181')

        // Coluna Ano atual
        const serie3 = this.chart.series.push(new am4charts.ColumnSeries())
        serie3.dataFields.valueY = 'VendaAnoAtual'
        serie3.dataFields.categoryX = 'Mes'
        serie3.name = response?.AnoAtual
        serie3.tooltipText = '{name}: [bold]{valueY.formatNumber("#.00")}[/]'
        serie3.stroke = am4core.color('#6fb142')
        serie3.columns.template.fill = am4core.color('#6fb142')

        // Linhas
        const series2 = this.chart.series.push(new am4charts.LineSeries())
        series2.dataFields.valueY = 'MediaAnoAnterior'
        series2.dataFields.categoryX = 'Mes'
        series2.name = `Média ${response?.AnoAnterior}`
        series2.tooltipText = '{name}: [bold]{valueY.formatNumber("#.00")}[/]'
        series2.strokeWidth = 5
        // series2.yAxis = valueAxis2

        // Adiciona a legenda
        this.chart.legend = new am4charts.Legend()

        // Adiciona os cursores
        this.chart.cursor = new am4charts.XYCursor()
        this.chart.cursor.behavior = 'none'
      })
  }
}
