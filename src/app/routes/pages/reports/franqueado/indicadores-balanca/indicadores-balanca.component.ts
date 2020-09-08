import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'ft-indicadores-balanca',
  templateUrl: './indicadores-balanca.component.html',
  styleUrls: ['./indicadores-balanca.component.scss'],
})
export class IndicadoresBalancaComponent implements OnInit {
  cars: any[]

  constructor() {}

  ngOnInit(): void {
    this.cars = [
      { vin: '123', year: 1988, brand: 'Honda', color: 'black' },
      { vin: '123', year: 1988, brand: 'Honda', color: 'black' },
      { vin: '123', year: 1988, brand: 'Honda', color: 'black' },
      { vin: '123', year: 1988, brand: 'Honda', color: 'black' },
      { vin: '123', year: 1988, brand: 'Honda', color: 'black' },
      { vin: '123', year: 1988, brand: 'Honda', color: 'black' },
    ]
  }
}
