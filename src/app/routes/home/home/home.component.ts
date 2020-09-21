import { Component, OnDestroy, OnInit } from '@angular/core';
import { FranqueadosService } from './../../../core/services/dashboards/franqueados.service';
import { EDateAction, HelperService } from './../../../core/services/helper.service';
import { IListaFranqueadoPerfil } from './../../../shared/interfaces/lista-franqueado-perfil.interface';
import { FiltroFranqueado } from './../../../shared/models/filtro-indicadores.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private onScrollEvent
  public month: string
  public codigoFranqueado = 0
  private codigoFranquia = 0

  public carregarValores = {
    carregarHistorico: false,
    carregaVendasAcumuladas: false,
    carregaTopProdutos: false,
    carregarVendasMensal: true,
  }

  public dateReference = new Date()
  public fullYear = this.dateReference.getFullYear()
  public filtrosPesquisa: FiltroFranqueado = new FiltroFranqueado(0)

  constructor(
    private _helperService: HelperService,
    public franqueadoService: FranqueadosService
  ) {
    this.month = this._helperService.getReferenceMonth(this.dateReference)

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
    this.filtrosPesquisa.codigoFranqueado = franqueado?.codigo
    // }
  }

  ngOnInit() {}

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onScrollEvent, false)
  }

  decrementMonthReference() {
    this.month = this._helperService.getReferenceMonth(this.dateReference, EDateAction.DECREMENT)
    this.fullYear = this.dateReference.getFullYear()
    this.filtrosPesquisa.ano = this.dateReference.getFullYear().toString()
    this.filtrosPesquisa.mes = (this.dateReference.getMonth() + 1).toString()
    this.filtrosPesquisa = Object.assign({}, this.filtrosPesquisa)
  }

  incrementMonthReference() {
    this.month = this._helperService.getReferenceMonth(this.dateReference, EDateAction.INCREMENT)
    this.fullYear = this.dateReference.getFullYear()
    this.filtrosPesquisa.ano = this.dateReference.getFullYear().toString()
    this.filtrosPesquisa.mes = (this.dateReference.getMonth() + 1).toString()
    this.filtrosPesquisa = Object.assign({}, this.filtrosPesquisa)
  }
}
