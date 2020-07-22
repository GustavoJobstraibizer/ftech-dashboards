import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import { BaseChart } from './chart-base.model';
import am4lang_pt_BR from '@amcharts/amcharts4/lang/pt_BR';
import { IChartFtech } from '../interfaces/chart-fetch.interface';

export class FtechChartXY extends BaseChart<am4charts.XYChart>
  implements IChartFtech {
  public columnSeries: am4charts.ColumnSeries;
  public lineSeries: am4charts.LineSeries;

  constructor(htmlElement: string) {
    super();
    this.htmlElement = htmlElement;
  }

  createChart() {
    this.chart = am4core.create(this.htmlElement, am4charts.XYChart);
    this.chart.language.locale = am4lang_pt_BR;
    this.chart.responsive.enabled = true;
    this.chart.logo.disabled = true;
  }

  addLegend() {
    this.chart.legend = new am4charts.Legend();
  }

  addXYCursor() {
    this.chart.cursor = new am4charts.XYCursor();
  }
}

// class SerieChart {
//   public dataFields: DataFieldChartSerie;
//   public name: string;
//   public tooltip: string;
//   public stroke: am4core.Color;
//   public strokeWidth: number;
// }

// class DataFieldChartSerie {
//   public valueY: string;
//   public categoryX: string;
// }
