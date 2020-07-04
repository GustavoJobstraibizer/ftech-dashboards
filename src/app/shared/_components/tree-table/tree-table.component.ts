import { Component, OnInit, Input } from '@angular/core';
import { IVendaCategoriaProduto } from '../../interfaces/venda-categoria-produto.interface';

@Component({
  selector: 'ft-tree-table',
  templateUrl: './tree-table.component.html',
  styleUrls: ['./tree-table.component.scss'],
})
export class TreeTableComponent implements OnInit {
  @Input() listValues: any[] = [];

  public showItems = true;

  constructor() {}

  ngOnInit(): void {}

  toggleItems(item: IVendaCategoriaProduto) {
    item.Expanded = !item.Expanded;
    this.listValues.map((catProd) => {
      if (
        catProd.CodigoCategoriaProduto === item.CodigoCategoriaProduto &&
        !catProd['Categoria']
      ) {
        catProd['Visible'] = !catProd['Visible'];
        return catProd;
      }
    });
  }
}
