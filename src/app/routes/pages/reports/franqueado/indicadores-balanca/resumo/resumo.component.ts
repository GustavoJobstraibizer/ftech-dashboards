import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IResumoBalancaTotalizador } from './../../../../../../shared/interfaces/resumo-balanca-totalizador.interface';

@Component({
  selector: 'ft-resumo',
  templateUrl: './resumo.component.html',
  styleUrls: ['./resumo.component.scss'],
})
export class ResumoComponent implements OnInit, OnChanges {
  @Input() resumoBalancaTotal: IResumoBalancaTotalizador
  @Input() loading: boolean

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    this.loading = changes?.loading.currentValue
  }
}
