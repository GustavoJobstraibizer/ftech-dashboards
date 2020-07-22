import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';

export class BaseChart<T extends am4charts.XYChart | am4charts.PieChart> {
  public chart: T;
  public htmlElement: string;

  constructor() {}

  dispose() {
    this.chart.dispose();
  }

  // createColumsSerie() {
  //   const series = new am4charts.ColumnSeries();
  //   series.dataFields.valueY = 'Valor';
  //   series.dataFields.categoryX = 'Mes';
  //   series.name = 'Vendas';
  //   series.tooltipText = '{name}: [bold]{valueY}[/]';
  //   series.stroke = am4core.color('#6fb142');
  //   series.columns.template.fill = am4core.color('#6fb142');
  //   return series;
  // }

  // createLineSeries() {
  //   const series = new am4charts.LineSeries();
  //   series.dataFields.valueY = 'Media';
  //   series.dataFields.categoryX = 'Mes';
  //   series.name = 'Média 1 ano';
  //   series.tooltipText = '{name}: [bold]{valueY}[/]';
  //   series.stroke = am4core.color('#4472c4');
  //   series.strokeWidth = 5;
  //   return series;
  // }
}

// class SerieChart {
//   public dataFields: DataFieldChartSerie;
//   public name: string;
//   public tooltipText: string;
//   public stroke: string;
//   public strokeWidth: string;
// }

// class DataFieldChartSerie {
//   public valueY: string;
//   public categoryX: string;
// }
