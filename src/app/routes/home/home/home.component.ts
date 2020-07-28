import { Component, OnDestroy, OnInit } from '@angular/core'
import { FranqueadosService } from './../../../core/services/dashboards/franqueados.service'
import { HelperService } from './../../../core/services/helper.service'
import { IListaFranqueadoPerfil } from './../../../shared/interfaces/lista-franqueado-perfil.interface'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private onScrollEvent
  public month: string
  public codigoFranqueado = 0
  public fullYear = new Date().getFullYear()
  private codigoFranquia = 0

  public carregarValores = {
    carregarHistorico: false,
    carregaVendasAcumuladas: false,
    carregaTopProdutos: false,
    carregarVendasMensal: true,
  }

  constructor(
    private _helperService: HelperService,
    public franqueadoService: FranqueadosService
  ) {
    this.month = this._helperService.getReferenceMonth()

    this.onScrollEvent = () => {
      this.checkTheTopOfCardChart('historicoVendas', 'carregarHistorico')
      this.checkTheTopOfCardChart('vendasAcumuladas', 'carregaVendasAcumuladas')
      this.checkTheTopOfCardChart('topProdutos', 'carregaTopProdutos')
      this.checkTheTopOfCardChart('vendasMensal', 'carregarVendasMensal')
    }

    window.addEventListener('scroll', this.onScrollEvent, false)
  }

  checkTheTopOfCardChart(elementId: string, control: string) {
    if (
      document.querySelector(`#${elementId}`).getBoundingClientRect().top <
      window.innerHeight
    ) {
      if (!this.carregarValores[control]) {
        this.carregarValores[control] = true
      }
    }
  }

  getCodigoFranqueado(franqueado: IListaFranqueadoPerfil) {
    // if (franqueado) {
    this.codigoFranqueado = franqueado?.codigo
    // }
  }

  ngOnInit() {}

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onScrollEvent, false)
  }

  // handleFilter() {
  //   this.codigoFranqueado = this.codigoFranquia
  // }
}
