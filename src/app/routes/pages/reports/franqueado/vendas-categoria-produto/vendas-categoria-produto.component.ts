import { Component, OnInit } from '@angular/core'
import { finalize, take } from 'rxjs/operators'
import { IPeriodoBusca } from 'src/app/shared/interfaces/periodo-busca.interface'
import { FranqueadosService } from './../../../../../core/services/dashboards/franqueados.service'

@Component({
  selector: 'ft-vendas-categoria-produto',
  templateUrl: './vendas-categoria-produto.component.html',
  styleUrls: ['./vendas-categoria-produto.component.scss'],
})
export class VendasCategoriaProdutoComponent implements OnInit {
  public periodo: IPeriodoBusca = {
    dataInicio: null,
    dataFim: null,
    codigoFranqueado: 0,
  }

  public listaVendasPorCategoria = []
  public loading = false

  constructor(public franqueadoService: FranqueadosService) {}

  ngOnInit(): void {
    this.getVendasCategoriaProduto()
  }

  getVendasCategoriaProduto() {
    this.loading = true
    this.franqueadoService
      .getVendasPorCategoriaProduto(
        this.periodo.dataInicio,
        this.periodo.dataFim,
        this.periodo.codigoFranqueado
      )
      .pipe(
        take(1),
        finalize(() => (this.loading = false))
      )
      .subscribe((response) => {
        this.listaVendasPorCategoria = response
      })
  }

  filtroPeriodo(filter: any) {
    this.periodo = filter
    this.getVendasCategoriaProduto()
  }
}
