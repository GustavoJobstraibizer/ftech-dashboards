import { SharedModule } from './../../../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { VendasHoraComponent } from './vendas-hora/vendas-hora.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendasCategoriaProdutoComponent } from './vendas-categoria-produto/vendas-categoria-produto.component';
import { DetalhamentoVendasComponent } from './detalhamento-vendas/detalhamento-vendas.component';
import { ItensComponent } from './detalhamento-vendas/itens/itens.component';
import { ClienteComponent } from './detalhamento-vendas/cliente/cliente.component';

const routes: Routes = [
  { path: 'vendas-por-hora', component: VendasHoraComponent },
  {
    path: 'vendas-por-categoria-produto',
    component: VendasCategoriaProdutoComponent,
  },
  {
    path: 'detalhamento-vendas',
    component: DetalhamentoVendasComponent,
  },
];

@NgModule({
  declarations: [
    VendasHoraComponent,
    VendasCategoriaProdutoComponent,
    DetalhamentoVendasComponent,
    ItensComponent,
    ClienteComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule],
})
export class FranqueadoModule {}
