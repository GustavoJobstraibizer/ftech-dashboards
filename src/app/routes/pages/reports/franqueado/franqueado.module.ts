import { SharedModule } from './../../../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { VendasHoraComponent } from './vendas-hora/vendas-hora.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendasCategoriaProdutoComponent } from './vendas-categoria-produto/vendas-categoria-produto.component';

const routes: Routes = [
  { path: 'vendas-por-hora', component: VendasHoraComponent },
  {
    path: 'vendas-por-categoria-produto',
    component: VendasCategoriaProdutoComponent,
  },
];

@NgModule({
  declarations: [VendasHoraComponent, VendasCategoriaProdutoComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule],
})
export class FranqueadoModule {}
