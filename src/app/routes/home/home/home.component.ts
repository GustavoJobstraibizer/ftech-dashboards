import { Component, OnInit } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    let chart = am4core.create('chartdiv', am4charts.PieChart);

    let series = chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = 'litres';
    series.dataFields.category = 'country';

    // Add data
    chart.data = [
      {
        country: 'Lithuania',
        litres: 501.9,
      },
      {
        country: 'Czech Republic',
        litres: 301.9,
      },
      {
        country: 'Ireland',
        litres: 201.1,
      },
      {
        country: 'Germany',
        litres: 165.8,
      },
      {
        country: 'Australia',
        litres: 139.9,
      },
      {
        country: 'Austria',
        litres: 128.3,
      },
      {
        country: 'UK',
        litres: 99,
      },
      {
        country: 'Belgium',
        litres: 60,
      },
      {
        country: 'The Netherlands',
        litres: 50,
      },
    ];

    // And, for a good measure, let's add a legend
    chart.legend = new am4charts.Legend();
  }
}
