import * as am4charts from '@amcharts/amcharts4/charts'
import * as am4core from '@amcharts/amcharts4/core'
import am4lang_pt_BR from '@amcharts/amcharts4/lang/pt_BR'
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
import { IVendasTopProdutos } from './../../../../interfaces/vendas-top-produtos.interface'

am4core.useTheme(am4themes_animated)

@Component({
  selector: 'chart-top-produtos',
  templateUrl: './top-produtos.component.html',
  styleUrls: ['./top-produtos.component.scss'],
})
export class TopProdutosComponent implements OnInit, OnChanges, OnDestroy {
  @Input() carregarTopProdutos = false
  @Input() codigoFranqueado = 0

  public topProdutos: IVendasTopProdutos[]
  public topProdTable: IVendasTopProdutos[]
  public chart: am4charts.XYChart
  public filtroFranqueado = new FiltroFranqueado(this.codigoFranqueado)

  public loading = false
  constructor(public franqueadosDashBoardsService: FranqueadosService) {}

  ngOnInit(): void {
    this.getTopProdutos()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.carregarTopProdutos && this.codigoFranqueado) {
      this.filtroFranqueado.codigoFranqueado = this.codigoFranqueado
      this.getTopProdutos()
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

  sortByValueAsc(a, b) {
    return a.Valor - b.Valor
  }

  sortByValueDesc(a, b) {
    return b.Valor - a.Valor
  }

  getTopProdutos() {
    this.disposeChart()
    this.chart = am4core.create('chartTopProdutos', am4charts.XYChart)
    this.chart.language.locale = am4lang_pt_BR
    this.chart.responsive.enabled = true
    this.chart.logo.disabled = true

    this.loading = true
    this.franqueadosDashBoardsService
      .getVendasTopProdutos(this.filtroFranqueado)
      .pipe(
        finalize(() => {
          this.loading = false
        })
      )
      .subscribe((response) => {
        this.topProdutos = response
        this.topProdutos.sort(this.sortByValueAsc)

        // const topProds = this.topProdutos

        this.topProdTable = this.topProdutos

        this.chart.data = this.topProdutos

        const categoryAxis = this.chart.yAxes.push(new am4charts.CategoryAxis())
        categoryAxis.dataFields.category = 'Produto'
        categoryAxis.renderer.minGridDistance = 2
        categoryAxis.renderer.grid.template.disabled = true

        const valueAxis = this.chart.xAxes.push(new am4charts.ValueAxis())
        valueAxis.renderer.grid.template.disabled = true

        valueAxis.renderer.labels.template.adapter.add('text', (text) => ``)

        const series = this.chart.series.push(new am4charts.ColumnSeries())
        series.dataFields.valueX = 'Valor'
        series.dataFields.categoryY = 'Produto'
        series.columns.template.fill = am4core.color('#6fb142')
        series.columns.template.stroke = am4core.color('#6fb142')
        series.columns.template.strokeWidth = 1
        series.columns.template.strokeOpacity = 0.5
        series.columns.template.height = am4core.percent(45)

        const labelBullet = series.bullets.push(new am4charts.LabelBullet())
        labelBullet.label.text = '{valueX.formatNumber("#.00")}'
        labelBullet.label.truncate = false
        labelBullet.label.fontSize = 16
        labelBullet.label.fontWeight = 'bold'
        labelBullet.label.horizontalCenter = 'left'
        labelBullet.dx = 2
        labelBullet.valign = 'middle'

        this.chart.cursor = new am4charts.XYCursor()
        this.chart.cursor.lineX.disabled = true
        this.chart.cursor.lineY.disabled = true

        valueAxis.cursorTooltipEnabled = false
      })
  }
}
