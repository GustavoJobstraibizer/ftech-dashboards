import { Component, Input, OnInit } from '@angular/core';
import { IResumoBalancaTotalizador } from './../../../../../../shared/interfaces/resumo-balanca-totalizador.interface';

@Component({
  selector: 'ft-resumo',
  templateUrl: './resumo.component.html',
  styleUrls: ['./resumo.component.scss'],
})
export class ResumoComponent implements OnInit {
  @Input() resumoBalancaTotal: IResumoBalancaTotalizador

  constructor() {}

  ngOnInit(): void {}
}
