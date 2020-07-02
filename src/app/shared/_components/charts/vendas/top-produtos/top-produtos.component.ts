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

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'chart-top-produtos',
  templateUrl: './top-produtos.component.html',
  styleUrls: ['./top-produtos.component.scss'],
})
export class TopProdutosComponent implements OnInit, OnChanges {
  @Input() carregarTopProdutos = false;

  public topProdutos: any;
  public chart: any;
  public filtroFranqueado = new FiltroFranqueado(0);

  // @TODO Incluir tipo parametro top 10, 20, 30, 40

  constructor(public franqueadosDashBoardsService: FranqueadosService) {}

  ngOnInit(): void {
    this.chart = am4core.create('chartTopProdutos', am4charts.XYChart);
    this.chart.language.locale = am4lang_pt_BR;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.carregarTopProdutos &&
      changes.carregarTopProdutos.currentValue
    ) {
      this.getTopProdutos();
    }
  }

  sortByValor(a, b) {
    if (a.Valor < b.Valor) {
      return -1;
    } else if (a.Valor > b.Valor) {
      return 1;
    }
    return 0;
  }

  getTopProdutos() {
    this.franqueadosDashBoardsService
      .getVendasTopProdutos(this.filtroFranqueado)
      .subscribe((response) => {
        this.topProdutos = response?.Data || [];

        this.topProdutos.sort(this.sortByValor);

        this.chart.data = this.topProdutos;

        const categoryAxis = this.chart.yAxes.push(
          new am4charts.CategoryAxis()
        );
        categoryAxis.dataFields.category = 'Produto';
        categoryAxis.renderer.minGridDistance = 2;
        categoryAxis.renderer.grid.template.disabled = true;

        const valueAxis = this.chart.xAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.grid.template.disabled = true;

        valueAxis.renderer.labels.template.adapter.add('text', (text) => ``);

        const series = this.chart.series.push(new am4charts.ColumnSeries());
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
        labelBullet.label.fontSize = 16;
        labelBullet.label.fontWeight = 'bold';

        this.chart.cursor = new am4charts.XYCursor();
        this.chart.cursor.lineX.disabled = true;
        this.chart.cursor.lineY.disabled = true;

        valueAxis.cursorTooltipEnabled = false;
      });
  }
}
