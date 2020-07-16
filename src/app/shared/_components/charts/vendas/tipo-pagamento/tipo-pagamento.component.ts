import { IVendasTipoPagamento } from './../../../../interfaces/vendas-tipo-pagamento.interface';
import { FranqueadosService } from './../../../../../core/services/dashboards/franqueados.service';
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
import { FiltroFranqueado } from 'src/app/shared/models/filtro-indicadores.model';

am4core.useTheme(am4themes_animated);

// const colors = {
//   Dinheiro: '#6fb142',
//   Crédito: '#4472c4',
//   Débito: '#ffc54b',
//   Cortesia: '#5f7b53',
// };

const colors = [
  '#6fb142',
  '#4472c4',
  '#ffc54b',
  '#5f7b53',
  '#b085f5',
  '#ff6f60',
  '#63a4ff',
  '#52c7b8',
  '#80e27e',
  '#8bc34a',
];

@Component({
  selector: 'chart-tipo-pagamento',
  templateUrl: './tipo-pagamento.component.html',
  styleUrls: ['./tipo-pagamento.component.scss'],
})
export class TipoPagamentoComponent implements OnInit, OnChanges, OnDestroy {
  @Input() codigoFranqueado = 0;
  public vendasTipoPagamento: IVendasTipoPagamento;
  public filtroFranqueado = new FiltroFranqueado(this.codigoFranqueado);
  public chart: am4charts.PieChart;

  constructor(public franqueadosDashBoardsService: FranqueadosService) {}

  ngOnInit(): void {
    this.getVendasTipoPagto();
  }

  getVendasTipoPagto() {
    this.chart = am4core.create('chartTipoPagamento', am4charts.PieChart);
    this.chart.responsive.enabled = true;
    this.chart.logo.disabled = true;
    this.franqueadosDashBoardsService
      .getVendasTipoPagamento(this.filtroFranqueado)
      .subscribe((response) => {
        this.vendasTipoPagamento = response;

        // this.vendasTipoPagamento.Data.map(
        //   (formPag) =>
        //     (formPag.color = am4core.color(
        //       colors[formPag.FormaPagamento]
        //         ? colors[formPag.FormaPagamento]
        //         : this.getRandomColor()
        //     ))
        // );

        this.chart.data = [];
        this.chart.data = [...this.vendasTipoPagamento.Data];

        const pieSeries = this.chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = 'Valor';
        pieSeries.dataFields.category = 'FormaPagamento';
        pieSeries.slices.template.propertyFields.fill = 'color';

        this.chart.legend = new am4charts.Legend();
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.codigoFranqueado && changes.codigoFranqueado.currentValue) {
      this.filtroFranqueado.codigoFranqueado =
        changes.codigoFranqueado.currentValue;
      this.getVendasTipoPagto();
    }
  }

  ngOnDestroy() {
    this.chart.dispose();
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
