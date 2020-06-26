import { FranqueadosService } from './../../../../../core/services/dashboards/franqueados.service';
import { IVendasMensal } from './../../../../interfaces/vendas-mensal.interface';
import { Component, OnInit } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_kelly from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_kelly);
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'chart-mensal',
  templateUrl: './mensal.component.html',
  styleUrls: ['./mensal.component.scss'],
})
export class MensalComponent implements OnInit {
  public vendasMensal: any;
  private chart: am4charts.XYChart;

  constructor(public franqueadosDashBoardsService: FranqueadosService) {}

  ngOnInit(): void {
    this.franqueadosDashBoardsService
      .getVendasMensal()
      .subscribe((response) => {
        console.log(response);
        this.vendasMensal = response;
        const chart = am4core.create('chartVendasMensal', am4charts.XYChart);

        // let chart = am4core.create("chartdiv", am4charts.XYChart);

        chart.paddingRight = 20;
        chart.data = [...this.vendasMensal];

        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = 'Mes';
        // categoryAxis.title.text = 'Vendas';

        // First value axis
        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        // valueAxis.title.text = 'Venda';

        // Second value axis
        var valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
        // valueAxis2.title.text = 'Media sold';
        valueAxis2.renderer.opposite = true;

        // First series
        var series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = 'Valor';
        series.dataFields.categoryX = 'Mes';
        series.name = 'Vendas';
        series.tooltipText = '{name}: [bold]{valueY}[/]';

        // Second series
        var series2 = chart.series.push(new am4charts.LineSeries());
        series2.dataFields.valueY = 'Media';
        series2.dataFields.categoryX = 'Mes';
        series2.name = 'Média 1 ano';
        series2.tooltipText = '{name}: [bold]{valueY}[/]';
        series2.strokeWidth = 3;
        series2.yAxis = valueAxis2;

        // Add legend
        chart.legend = new am4charts.Legend();

        // Add cursor
        chart.cursor = new am4charts.XYCursor();
        // chart.legend = new am4charts.Legend();
      });
  }
}
