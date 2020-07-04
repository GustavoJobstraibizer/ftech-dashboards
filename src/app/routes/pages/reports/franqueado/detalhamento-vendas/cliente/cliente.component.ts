import { IClienteFranqueado } from './../../../../../../shared/interfaces/vendas-franqueado.interface';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ft-cliente-detalhes',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
})
export class ClienteComponent implements OnInit {
  @Input() cliente: IClienteFranqueado;

  constructor() {}

  ngOnInit(): void {}
}
