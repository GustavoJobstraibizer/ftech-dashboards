import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { TooltipModule } from 'ngx-bootstrap/tooltip'
import { ButtonModule } from 'primeng/button'
import { TableModule } from 'primeng/table'
import { SharedModule } from './../../../../shared/shared.module'
import { ConsumoInternoComponent } from './consumo-interno/consumo-interno.component'
import { DetalhesComponent } from './consumo-interno/detalhes/detalhes.component'
import { ClienteComponent } from './detalhamento-vendas/cliente/cliente.component'
import { DetalhamentoVendasComponent } from './detalhamento-vendas/detalhamento-vendas.component'
import { ItensComponent } from './detalhamento-vendas/itens/itens.component'
import { DetalhamentoRegistrosComponent } from './indicadores-balanca/detalhamento-registros/detalhamento-registros.component'
import { IndicadoresBalancaComponent } from './indicadores-balanca/indicadores-balanca.component'
import { ResumoComponent } from './indicadores-balanca/resumo/resumo.component'
import { VendasCategoriaProdutoComponent } from './vendas-categoria-produto/vendas-categoria-produto.component'
import { VendasHoraComponent } from './vendas-hora/vendas-hora.component'

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
  {
    path: 'consumo-interno',
    component: ConsumoInternoComponent,
  },
  {
    path: 'indicadores-da-balanca',
    component: IndicadoresBalancaComponent,
  },
]

@NgModule({
  declarations: [
    VendasHoraComponent,
    VendasCategoriaProdutoComponent,
    DetalhamentoVendasComponent,
    ItensComponent,
    ClienteComponent,
    ConsumoInternoComponent,
    DetalhesComponent,
    IndicadoresBalancaComponent,
    ResumoComponent,
    DetalhamentoRegistrosComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    TableModule,
    ButtonModule,
    TooltipModule,
  ],
  exports: [RouterModule],
})
export class FranqueadoModule {}
