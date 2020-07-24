import * as am4charts from '@amcharts/amcharts4/charts'
import * as am4core from '@amcharts/amcharts4/core'
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
import { finalize } from 'rxjs/operators'
import { FiltroFranqueado } from 'src/app/shared/models/filtro-indicadores.model'
import { FtechChartXY } from 'src/app/shared/models/ftech-chart.models'
import { FranqueadosService } from './../../../../../core/services/dashboards/franqueados.service'

am4core.useTheme(am4themes_kelly)
am4core.useTheme(am4themes_animated)

@Component({
  selector: 'chart-mensal',
  templateUrl: './mensal.component.html',
  styleUrls: ['./mensal.component.scss'],
})
export class MensalComponent extends FtechChartXY
  implements OnInit, OnChanges, OnDestroy {
  @Input() carregarVendasMensal = false
  @Input() codigoFranqueado = 0

  public vendasMensal: any
  public filtroFranqueado = new FiltroFranqueado(this.codigoFranqueado)
  public loading = false

  constructor(public franqueadosDashBoardsService: FranqueadosService) {
    super('chartVendasMensal')
  }

  ngOnInit(): void {
    this.getVendasMensal()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.carregarVendasMensal && this.codigoFranqueado) {
      this.filtroFranqueado.codigoFranqueado = this.codigoFranqueado
      this.getVendasMensal()
    }
  }

  ngOnDestroy() {
    this.dispose()
  }

  getVendasMensal() {
    this.dispose()
    this.createChart()

    this.loading = true
    this.franqueadosDashBoardsService
      .getVendasMensal(this.filtroFranqueado)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((response) => {
        this.vendasMensal = response

        this.chart.paddingLeft = 0
        this.chart.data = [...this.vendasMensal]

        const categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis())
        categoryAxis.dataFields.category = 'Mes'
        categoryAxis.renderer.grid.template.location = 0
        categoryAxis.renderer.minGridDistance = 10

        // First value axis
        this.chart.yAxes.push(new am4charts.ValueAxis())

        this.columnSeries = this.chart.series.push(new am4charts.ColumnSeries())
        this.columnSeries.dataFields.valueY = 'Valor'
        this.columnSeries.dataFields.categoryX = 'Mes'
        this.columnSeries.name = 'Mês'
        this.columnSeries.tooltipText =
          'Valor: [bold]{valueY}[/] no mês [bold]{categoryX}[/]'

        this.columnSeries.stroke = am4core.color('#6fb142')
        this.columnSeries.columns.template.fill = am4core.color('#6fb142')

        this.columnSeries.columns.template.width = am4core.percent(65)
        // this.columnSeries.strokeWidth = 0

        const bullet = this.columnSeries.bullets.push(
          new am4charts.LabelBullet()
        )
        bullet.label.text = '{categoryX}'
        bullet.label.rotation = 45
        bullet.label.truncate = false
        bullet.label.hideOversized = false
        bullet.label.horizontalCenter = 'left'
        bullet.locationY = 1
        bullet.dy = 10

        // this.chart.paddingBottom = 150
        // this.chart.maskBullets = false

        this.lineSeries = this.chart.series.push(new am4charts.LineSeries())
        this.lineSeries.dataFields.valueY = 'Media'
        this.lineSeries.dataFields.categoryX = 'Mes'
        this.lineSeries.name = 'Média 1 ano'
        this.lineSeries.tooltipText = '{name}: [bold]{valueY}[/]'
        this.lineSeries.stroke = am4core.color('#4472c4')
        this.lineSeries.strokeWidth = 5

        // Add legend
        this.addLegend()

        // Add cursor
        this.addXYCursor()
      })
  }

  createSeries() {}
}
