import { FranqueadosService } from './../../../../../core/services/dashboards/franqueados.service';
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_kelly from '@amcharts/amcharts4/themes/animated';
import { FiltroFranqueado } from 'src/app/shared/models/filtro-indicadores.model';

am4core.useTheme(am4themes_kelly);
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'chart-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss'],
})
export class HistoricoComponent implements OnInit, OnChanges {
  @Input() carregarHistorico = false;

  public historicoVendas: any;

  public chart: any;
  public filtroFranqueado = new FiltroFranqueado(0);

  constructor(public franqueadosDashBoardsService: FranqueadosService) {}

  ngOnInit(): void {
    this.chart = am4core.create('chartHistoricoVendas', am4charts.XYChart);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.carregarHistorico && changes.carregarHistorico.currentValue) {
      this.getHistoricoVendas();
    }
  }

  getHistoricoVendas() {
    this.franqueadosDashBoardsService
      .getVendasHistorico(this.filtroFranqueado)
      .subscribe((response) => {
        this.historicoVendas = response.Vendas;

        this.chart.paddingRight = 20;
        this.chart.data = [...this.historicoVendas];

        const categoryAxis = this.chart.xAxes.push(
          new am4charts.CategoryAxis()
        );
        categoryAxis.dataFields.category = 'Mes';

        // First value axis
        const valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());

        // Second value axis
        // const valueAxis2 = this.chart.yAxes.push(new am4charts.ValueAxis());
        // valueAxis2.renderer.opposite = true;

        // First series
        const series = this.chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = 'VendaAnoAnterior';
        series.dataFields.categoryX = 'Mes';
        series.name = response.AnoAnterior;
        series.tooltipText = '{name}: [bold]{valueY}[/]';
        series.stroke = am4core.color('#818181');
        series.columns.template.fill = am4core.color('#818181');

        const serie3 = this.chart.series.push(new am4charts.ColumnSeries());
        serie3.dataFields.valueY = 'VendaAnoAtual';
        serie3.dataFields.categoryX = 'Mes';
        serie3.name = response.AnoAtual;
        serie3.tooltipText = '{name}: [bold]{valueY}[/]';
        serie3.stroke = am4core.color('#6fb142');
        serie3.columns.template.fill = am4core.color('#6fb142');

        // Second series
        const series2 = this.chart.series.push(new am4charts.LineSeries());
        series2.dataFields.valueY = 'MediaAnoAnterior';
        series2.dataFields.categoryX = 'Mes';
        series2.name = `Média ${response.AnoAnterior}`;
        series2.tooltipText = '{name}: [bold]{valueY}[/]';
        series2.strokeWidth = 5;
        // series2.yAxis = valueAxis2;

        // Adiciona a legenda
        this.chart.legend = new am4charts.Legend();

        // Adiciona os cursores
        this.chart.cursor = new am4charts.XYCursor();
      });
  }
}
