import { FranqueadosService } from './../../../../../core/services/dashboards/franqueados.service';
import { IVendasMensal } from './../../../../interfaces/vendas-mensal.interface';
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_kelly from '@amcharts/amcharts4/themes/animated';
import { FiltroFranqueado } from 'src/app/shared/models/filtro-indicadores.model';
import { formatNumber } from '@angular/common';
import am4lang_pt_BR from '@amcharts/amcharts4/lang/pt_BR';

am4core.useTheme(am4themes_kelly);
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'chart-mensal',
  templateUrl: './mensal.component.html',
  styleUrls: ['./mensal.component.scss'],
})
export class MensalComponent implements OnInit, OnChanges, OnDestroy {
  @Input() carregarVendasMensal = false;

  public vendasMensal: any;
  private chart: am4charts.XYChart;
  public filtroFranqueado = new FiltroFranqueado(0);

  constructor(public franqueadosDashBoardsService: FranqueadosService) {}

  ngOnInit(): void {
    this.chart = am4core.create('chartVendasMensal', am4charts.XYChart);
    this.chart.language.locale = am4lang_pt_BR;
    this.chart.responsive.enabled = true;
    this.chart.logo.disabled = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.carregarVendasMensal &&
      changes.carregarVendasMensal.currentValue
    ) {
      this.getVendasMensal();
    }
  }

  ngOnDestroy() {
    this.chart.dispose();
  }

  getVendasMensal() {
    this.franqueadosDashBoardsService
      .getVendasMensal(this.filtroFranqueado)
      .subscribe((response) => {
        this.vendasMensal = response;

        this.chart.paddingRight = 20;
        this.chart.data = [...this.vendasMensal];

        const categoryAxis = this.chart.xAxes.push(
          new am4charts.CategoryAxis()
        );
        categoryAxis.dataFields.category = 'Mes';

        // First value axis
        const valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
        // valueAxis.numberFormatter.numberFormat = '#.00';

        // valueAxis.renderer.labels.template.adapter.add(
        //   'text',
        //   (text) => `${formatNumber(+text, 'pt-BR', '1.3-3')}`
        // );

        // Second value axis
        // const valueAxis2 = this.chart.yAxes.push(new am4charts.ValueAxis());
        // valueAxis2.renderer.opposite = true;

        // First series
        const series = this.chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = 'Valor';
        series.dataFields.categoryX = 'Mes';
        series.name = 'Vendas';
        series.tooltipText = '{name}: [bold]{valueY}[/]';
        series.stroke = am4core.color('#6fb142');
        series.columns.template.fill = am4core.color('#6fb142');

        // Second series
        const series2 = this.chart.series.push(new am4charts.LineSeries());
        series2.dataFields.valueY = 'Media';
        series2.dataFields.categoryX = 'Mes';
        series2.name = 'Média 1 ano';
        series2.tooltipText = '{name}: [bold]{valueY}[/]';
        series2.stroke = am4core.color('#4472c4');
        series2.strokeWidth = 5;
        // series2.yAxis = valueAxis2;

        // Add legend
        this.chart.legend = new am4charts.Legend();

        // Add cursor
        this.chart.cursor = new am4charts.XYCursor();
      });
  }
}
