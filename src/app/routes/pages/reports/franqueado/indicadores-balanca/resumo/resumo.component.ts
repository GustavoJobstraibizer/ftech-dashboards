import { Component, Input, OnInit } from '@angular/core'
import { IIndicadoresBalanca } from './../../../../../../shared/interfaces/indicadores-balanca.interface'

@Component({
  selector: 'ft-resumo',
  templateUrl: './resumo.component.html',
  styleUrls: ['./resumo.component.scss'],
})
export class ResumoComponent implements OnInit {
  @Input() indicadorBalanca: IIndicadoresBalanca

  constructor() {}

  ngOnInit(): void {}
}
