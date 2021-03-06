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
  SimpleChanges
} from '@angular/core'
import { finalize, take } from 'rxjs/operators'
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
  @Input() filtrosPesquisa: FiltroFranqueado = new FiltroFranqueado(this.codigoFranqueado)

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
    if (this.carregarTopProdutos && this.codigoFranqueado || this.filtrosPesquisa) {
      this.filtroFranqueado.codigoFranqueado = this.codigoFranqueado
      this.filtroFranqueado.ano = this.filtrosPesquisa.ano
      this.filtroFranqueado.mes = this.filtrosPesquisa.mes
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
    this.chart.numberFormatter.language = new am4core.Language()
    this.chart.numberFormatter.language.locale = am4lang_pt_BR
    this.chart.responsive.enabled = true
    this.chart.logo.disabled = true

    this.chart.events.on('beforedatavalidated', (ev) => {
      this.chart.data.sort(this.sortByValueAsc)
    })

    this.loading = true
    this.franqueadosDashBoardsService
      .getVendasTopProdutos(this.filtroFranqueado)
      .pipe(
        take(1),
        finalize(() => {
          this.loading = false
        })
      )
      .subscribe((response) => {
        if (!response.length) {
          return
        }
        this.topProdutos = response.map((item) => {
          if (item.Valor) {
            item.Valor = parseFloat(item.Valor.toString()).toFixed(2)
          }
          return item
        })
        this.topProdutos = this.topProdutos.sort(this.sortByValueDesc)

        this.chart.data = this.topProdutos

        this.topProdTable = Object.assign([], this.chart.data)
        this.topProdTable.sort(this.sortByValueDesc)

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
        labelBullet.language.locale = am4lang_pt_BR
        labelBullet.numberFormatter.language.locale = am4lang_pt_BR
        labelBullet.label.text = '{valueX}'
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
