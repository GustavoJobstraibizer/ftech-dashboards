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

  public vendasMensal: any
  public filtroFranqueado = new FiltroFranqueado(0)

  constructor(public franqueadosDashBoardsService: FranqueadosService) {
    super('chartVendasMensal')
  }

  ngOnInit(): void {
    this.createChart()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.carregarVendasMensal &&
      changes.carregarVendasMensal.currentValue
    ) {
      this.getVendasMensal()
    }
  }

  ngOnDestroy() {
    this.dispose()
  }

  getVendasMensal() {
    this.franqueadosDashBoardsService
      .getVendasMensal(this.filtroFranqueado)
      .subscribe((response) => {
        this.vendasMensal = response

        this.chart.paddingRight = 20
        this.chart.data = [...this.vendasMensal]

        const categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis())
        categoryAxis.dataFields.category = 'Mes'

        // First value axis
        const valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis())

        this.columnSeries = this.chart.series.push(new am4charts.ColumnSeries())
        this.columnSeries.dataFields.valueY = 'Valor'
        this.columnSeries.dataFields.categoryX = 'Mes'
        this.columnSeries.name = 'Vendas'
        this.columnSeries.tooltipText = '{name}: [bold]{valueY}[/]'
        this.columnSeries.stroke = am4core.color('#6fb142')
        this.columnSeries.columns.template.fill = am4core.color('#6fb142')

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
}
