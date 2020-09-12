import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'ft-indicador',
  templateUrl: './indicador.component.html',
  styleUrls: ['./indicador.component.scss'],
})
export class IndicadorComponent implements OnInit {
  @Input() value: any
  @Input() title: string
  @Input() loading = false

  constructor() {}

  ngOnInit(): void {}
}
