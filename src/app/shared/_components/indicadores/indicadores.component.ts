import { HelperService } from './../../../core/services/helper.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ft-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.scss'],
})
export class IndicadoresComponent implements OnInit {
  public month: string;

  constructor(private _helperService: HelperService) {}

  ngOnInit(): void {
    this.month = this._helperService.getReferenceMonth();
  }
}
