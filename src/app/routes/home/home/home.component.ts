import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private onScrollEvent;

  public carregarValores = {
    carregarHistorico: false,
    carregaVendasAcumuladas: false,
    carregaTopProdutos: false,
    carregarVendasMensal: false,
  };

  constructor() {
    this.onScrollEvent = () => {
      this.checkTheTopOfCardChart('historicoVendas', 'carregarHistorico');
      this.checkTheTopOfCardChart(
        'vendasAcumuladas',
        'carregaVendasAcumuladas'
      );
      this.checkTheTopOfCardChart('topProdutos', 'carregaTopProdutos');
      this.checkTheTopOfCardChart('vendasMensal', 'carregarVendasMensal');
    };

    window.addEventListener('scroll', this.onScrollEvent, false);
  }

  checkTheTopOfCardChart(elementId: string, control: string) {
    if (
      document.querySelector(`#${elementId}`).getBoundingClientRect().top <
      window.innerHeight
    ) {
      if (!this.carregarValores[control]) {
        this.carregarValores[control] = true;
      }
    }
  }

  ngOnInit() {}

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onScrollEvent, false);
  }
}
