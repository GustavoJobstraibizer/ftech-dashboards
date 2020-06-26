import { IVendasTipoPagamento } from './../../../../interfaces/vendas-tipo-pagamento.interface';
import { FranqueadosService } from './../../../../../core/services/dashboards/franqueados.service';
import { Component, OnInit } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'chart-tipo-pagamento',
  templateUrl: './tipo-pagamento.component.html',
  styleUrls: ['./tipo-pagamento.component.scss'],
})
export class TipoPagamentoComponent implements OnInit {
  constructor(public franqueadosDashBoardsService: FranqueadosService) {}

  public vendasTipoPagamento: IVendasTipoPagamento;

  ngOnInit(): void {
    const chart = am4core.create('chartTipoPagamento', am4charts.PieChart);

    const series = chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = 'Valor';
    series.dataFields.category = 'FormaPagamento';

    this.franqueadosDashBoardsService
      .getVendasTipoPagamento()
      .subscribe((response) => {
        console.log(response);
        this.vendasTipoPagamento = response;
        chart.data = [...this.vendasTipoPagamento.Data];

        chart.legend = new am4charts.Legend();
      });
  }
}
