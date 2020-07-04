import { FranqueadosService } from './../../../../../../core/services/dashboards/franqueados.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ft-itens',
  templateUrl: './itens.component.html',
  styleUrls: ['./itens.component.scss'],
})
export class ItensComponent implements OnInit {
  codigoDocumento: string;

  constructor(public franqueadosService: FranqueadosService) {}

  ngOnInit(): void {
    if (this.codigoDocumento) {
      this.franqueadosService
        .getVendasFranqueadoDetalhado(this.codigoDocumento)
        .subscribe((response) => {
          console.log(response);
        });
    }
  }
}
