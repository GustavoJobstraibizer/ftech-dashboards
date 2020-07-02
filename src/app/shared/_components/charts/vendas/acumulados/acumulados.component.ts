import { FranqueadosService } from './../../../../../core/services/dashboards/franqueados.service';
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_kelly from '@amcharts/amcharts4/themes/animated';
import { FiltroFranqueado } from 'src/app/shared/models/filtro-indicadores.model';
import am4lang_pt_BR from '@amcharts/amcharts4/lang/pt_BR';

am4core.useTheme(am4themes_kelly);
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'chart-acumulados',
  templateUrl: './acumulados.component.html',
  styleUrls: ['./acumulados.component.scss'],
})
export class AcumuladosComponent implements OnInit, OnChanges {
  public acumulados: any;
  public chart: any;
  public filtroFranqueado = new FiltroFranqueado(0);

  @Input() carregarVendasAcc = false;

  constructor(public franqueadosDashBoardsService: FranqueadosService) {}

  ngOnInit(): void {
    this.chart = am4core.create('chartVendasAcumuladas', am4charts.XYChart);
    this.chart.language.locale = am4lang_pt_BR;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.carregarVendasAcc && changes.carregarVendasAcc.currentValue) {
      this.getVendasAcumuladas();
    }
  }

  getVendasAcumuladas() {
    this.franqueadosDashBoardsService
      .getVendasAcumuladas(this.filtroFranqueado)
      .subscribe((response) => {
        this.acumulados = response?.Data || [];

        this.chart.marginRight = 400;

        this.chart.data = this.acumulados;

        // Create axes
        const categoryAxis = this.chart.xAxes.push(
          new am4charts.CategoryAxis()
        );
        categoryAxis.dataFields.category = 'Mes';
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 20;

        const valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());

        valueAxis.renderer.labels.template.adapter.add(
          'text',
          (text) => `R$ ${text}`
        );

        // Create series
        const series = this.chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = 'ValorAcumulado';
        series.dataFields.categoryX = 'Mes';
        series.name = 'Valor Acumulado';
        series.tooltipText = '{name}: [bold]{valueY}[/]';
        series.stacked = true;

        const series2 = this.chart.series.push(new am4charts.ColumnSeries());
        series2.dataFields.valueY = 'ValorVenda';
        series2.dataFields.categoryX = 'Mes';
        series2.name = 'Valor Venda';
        series2.tooltipText = '{name}: [bold]{valueY}[/]';
        series2.stacked = true;
        series2.stroke = am4core.color('#6fb142');
        series2.columns.template.fill = am4core.color('#6fb142');

        // Add cursor
        this.chart.cursor = new am4charts.XYCursor();
      });
  }
}
