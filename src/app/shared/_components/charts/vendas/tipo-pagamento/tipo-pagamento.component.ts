import { IVendasTipoPagamento } from './../../../../interfaces/vendas-tipo-pagamento.interface';
import { FranqueadosService } from './../../../../../core/services/dashboards/franqueados.service';
import { Component, OnInit } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

const colors = {
  Dinheiro: '#6fb142',
  Crédito: '#4472c4',
  Débito: '#ffc54b',
  Cortesia: '#5f7b53',
};

@Component({
  selector: 'chart-tipo-pagamento',
  templateUrl: './tipo-pagamento.component.html',
  styleUrls: ['./tipo-pagamento.component.scss'],
})
export class TipoPagamentoComponent implements OnInit {
  constructor(public franqueadosDashBoardsService: FranqueadosService) {}

  public vendasTipoPagamento: IVendasTipoPagamento;

  ngOnInit(): void {
    this.franqueadosDashBoardsService
      .getVendasTipoPagamento()
      .subscribe((response) => {
        this.vendasTipoPagamento = response;

        const chart = am4core.create('chartTipoPagamento', am4charts.PieChart);

        this.vendasTipoPagamento.Data.map(
          (formPag) =>
            (formPag.color = am4core.color(colors[formPag.FormaPagamento]))
        );

        chart.data = [...this.vendasTipoPagamento.Data];

        const pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = 'Valor';
        pieSeries.dataFields.category = 'FormaPagamento';
        pieSeries.slices.template.propertyFields.fill = 'color';

        chart.legend = new am4charts.Legend();
      });
  }
}
