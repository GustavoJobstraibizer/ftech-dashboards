import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ft-vendas-categoria-produto',
  templateUrl: './vendas-categoria-produto.component.html',
  styleUrls: ['./vendas-categoria-produto.component.scss'],
})
export class VendasCategoriaProdutoComponent implements OnInit {
  constructor() {}

  public showItems = false;

  ngOnInit(): void {}

  filtroPeriodo(filter: any) {
    // this.periodo = filter;
    // this.getVendasPorHora();
  }
}
