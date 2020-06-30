import { SharedModule } from './../../../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { VendasHoraComponent } from './vendas-hora/vendas-hora.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: 'vendas-por-hora', component: VendasHoraComponent },
];

@NgModule({
  declarations: [VendasHoraComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule],
})
export class FranqueadoModule {}
