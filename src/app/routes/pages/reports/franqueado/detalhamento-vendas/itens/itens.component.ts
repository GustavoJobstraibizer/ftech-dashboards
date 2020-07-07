import { IVendasFranqueadoDetalhes } from 'src/app/shared/interfaces/vendas-franqueado-detalhes.interface';
import { FranqueadosService } from './../../../../../../core/services/dashboards/franqueados.service';
import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'ft-itens',
  templateUrl: './itens.component.html',
  styleUrls: ['./itens.component.scss'],
})
export class ItensComponent implements OnInit {
  codigoDocumento: string;

  public vendaFranqueadoDetalhes: IVendasFranqueadoDetalhes;

  constructor(
    public franqueadosService: FranqueadosService,
    public bsModalRef: BsModalRef
  ) {}

  ngOnInit(): void {
    if (this.codigoDocumento) {
      this.franqueadosService
        .getVendasFranqueadoDetalhado(this.codigoDocumento)
        .subscribe((response) => {
          this.vendaFranqueadoDetalhes = response['Data'];
        });
    }
  }
}
