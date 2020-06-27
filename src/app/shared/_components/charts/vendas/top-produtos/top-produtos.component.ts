import { FranqueadosService } from './../../../../../core/services/dashboards/franqueados.service';
import { Component, OnInit } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_kelly from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'chart-top-produtos',
  templateUrl: './top-produtos.component.html',
  styleUrls: ['./top-produtos.component.scss'],
})
export class TopProdutosComponent implements OnInit {
  public topProdutos: any;

  constructor(public franqueadosDashBoardsService: FranqueadosService) {}

  ngOnInit(): void {
    this.franqueadosDashBoardsService
      .getVendasTopProdutos()
      .subscribe((response) => {
        console.log('top >>> ', response);

        this.topProdutos = response?.Data || [];

        const chart = am4core.create('chartTopProdutos', am4charts.XYChart);

        chart.data = this.topProdutos;

        /* Create axes */
        const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = 'Produto';
        categoryAxis.renderer.minGridDistance = 2;
        categoryAxis.renderer.grid.template.disabled = true;
        // categoryAxis.renderer.labels.clear();

        const valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
        // valueAxis.renderer.minGridDistance = 30;
        valueAxis.renderer.grid.template.disabled = true;
        // valueAxis.min = 0;
        // valueAxis.max = 100;
        // valueAxis.strictMinMax = true;
        valueAxis.renderer.labels.template.adapter.add(
          'text',
          (text) => `R$ ${text}`
        );

        /* Create ranges */
        // function createRange(axis, from, to, color) {
        //   const range = axis.axisRanges.create();
        //   range.value = from;
        //   range.endValue = to;
        //   range.axisFill.fill = color;
        //   range.axisFill.fillOpacity = 0.8;
        //   range.label.disabled = true;
        // }

        // createRange(valueAxis, 0, 20, am4core.color('#19d228'));
        // createRange(valueAxis, 20, 40, am4core.color('#b4dd1e'));
        // createRange(valueAxis, 40, 60, am4core.color('#f4fb16'));
        // createRange(valueAxis, 60, 80, am4core.color('#f6d32b'));
        // createRange(valueAxis, 80, 100, am4core.color('#fb7116'));

        /* Create series */
        const series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueX = 'Valor';
        series.dataFields.categoryY = 'Produto';
        series.columns.template.fill = am4core.color('#6fb142');
        series.columns.template.stroke = am4core.color('#6fb142');
        series.columns.template.strokeWidth = 1;
        series.columns.template.strokeOpacity = 0.5;
        series.columns.template.height = am4core.percent(35);

        const labelBullet = new am4charts.LabelBullet();
        series.bullets.push(labelBullet);
        labelBullet.label.text = 'R${valueX}';
        // labelBullet.label.marginLeft = 100;
        // labelBullet.marginRight = 100;
        labelBullet.label.fontSize = 16;
        labelBullet.label.fontWeight = 'bold';

        // const series2 = chart.series.push(new am4charts.StepLineSeries());
        // series2.dataFields.valueX = 'target';
        // series2.dataFields.categoryY = 'category';
        // series2.strokeWidth = 3;
        // series2.noRisers = true;
        // series2.startLocation = 0.15;
        // series2.endLocation = 0.85;
        // series2.tooltipText = '{valueX}';

        // const labelBullet = new am4charts.LabelBullet();
        // series2.bullets.push(labelBullet);
        // labelBullet.label.text = "{valueX.value.formatNumber('#.')}";

        // series2.stroke = am4core.color('#6fb142');

        chart.cursor = new am4charts.XYCursor();
        chart.cursor.lineX.disabled = true;
        chart.cursor.lineY.disabled = true;

        valueAxis.cursorTooltipEnabled = false;
      });
  }
}
