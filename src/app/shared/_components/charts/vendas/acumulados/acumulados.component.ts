import { FranqueadosService } from './../../../../../core/services/dashboards/franqueados.service';
import { Component, OnInit } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_kelly from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_kelly);
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'chart-acumulados',
  templateUrl: './acumulados.component.html',
  styleUrls: ['./acumulados.component.scss'],
})
export class AcumuladosComponent implements OnInit {
  public acumulados: any;

  constructor(public franqueadosDashBoardsService: FranqueadosService) {}

  ngOnInit(): void {
    this.franqueadosDashBoardsService
      .getVendasAcumuladas()
      .subscribe((response) => {
        this.acumulados = response?.Data || [];

        const chart = am4core.create(
          'chartVendasAcumuladas',
          am4charts.XYChart
        );

        chart.marginRight = 400;

        chart.data = this.acumulados;

        // Create axes
        const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = 'Mes';
        // categoryAxis.title.text = "Local Mes offices";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 20;

        const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        // valueAxis.title.text = "Expenditure (M)";
        // valueAxis.calculateTotals = true;
        // valueAxis.min = 0;
        // valueAxis.max = 100;
        // valueAxis.strictMinMax = true;
        valueAxis.renderer.labels.template.adapter.add(
          'text',
          (text) => `R$ ${text}`
        );

        // Create series
        const series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = 'ValorVenda';
        series.dataFields.categoryX = 'Mes';
        series.name = 'Valor Venda';
        series.tooltipText = '{name}: [bold]{valueY}[/]';
        series.stacked = true;

        const series2 = chart.series.push(new am4charts.ColumnSeries());
        series2.dataFields.valueY = 'ValorAcumulado';
        series2.dataFields.categoryX = 'Mes';
        series2.name = 'Valor Acumulado';
        series2.tooltipText = '{name}: [bold]{valueY}[/]';
        series2.stacked = true;

        // Add cursor
        chart.cursor = new am4charts.XYCursor();
      });
  }
}
