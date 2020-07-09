import { MaskDateDirective } from './../core/directives/mask-date.directive';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
// import { ToasterModule } from 'angular2-toaster/angular2-toaster';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { RatingModule } from 'ngx-bootstrap/rating';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ColorsService } from './colors/colors.service';
import { CheckallDirective } from './directives/checkall/checkall.directive';
import { EasypiechartDirective } from './directives/easypiechart/easypiechart.directive';
import { FlotDirective } from './directives/flot/flot.directive';
import { JqcloudDirective } from './directives/jqcloud/jqcloud.directive';
import { NowDirective } from './directives/now/now.directive';
import { ScrollableDirective } from './directives/scrollable/scrollable.directive';
import { SparklineDirective } from './directives/sparkline/sparkline.directive';
import { VectormapDirective } from './directives/vectormap/vectormap.directive';
import { CardComponent } from './_components/card/card.component';
import { TipoPagamentoComponent } from './_components/charts/vendas/tipo-pagamento/tipo-pagamento.component';
import { MensalComponent } from './_components/charts/vendas/mensal/mensal.component';
import { HistoricoComponent } from './_components/charts/vendas/historico/historico.component';
import { AcumuladosComponent } from './_components/charts/vendas/acumulados/acumulados.component';
import { TopProdutosComponent } from './_components/charts/vendas/top-produtos/top-produtos.component';
import { IndicadoresComponent } from './_components/indicadores/indicadores.component';
import { SkeletonLoaderComponent } from './_components/skeleton-loader/skeleton-loader.component';
import { PageTitleComponent } from './_components/page-title/page-title.component';
import { ComboFranquiasComponent } from './_components/filter/combo-franquias/combo-franquias.component';
import { PeriodoComponent } from './_components/filter/periodo/periodo.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { TreeTableComponent } from './_components/tree-table/tree-table.component';
import { EmptyContentComponent } from './_components/empty-content/empty-content.component';
import { ButtonFilterComponent } from './_components/buttons/button-filter/button-filter.component';

// https://angular.io/styleguide#!#04-10
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    AccordionModule.forRoot(),
    AlertModule.forRoot(),
    ButtonsModule.forRoot(),
    CarouselModule.forRoot(),
    CollapseModule.forRoot(),
    DatepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    ProgressbarModule.forRoot(),
    RatingModule.forRoot(),
    TabsModule.forRoot(),
    TimepickerModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    TypeaheadModule.forRoot(),
    NgSelectModule,
  ],
  providers: [ColorsService],
  declarations: [
    FlotDirective,
    SparklineDirective,
    EasypiechartDirective,
    CheckallDirective,
    VectormapDirective,
    NowDirective,
    ScrollableDirective,
    JqcloudDirective,
    CardComponent,
    TipoPagamentoComponent,
    MensalComponent,
    HistoricoComponent,
    AcumuladosComponent,
    TopProdutosComponent,
    IndicadoresComponent,
    SkeletonLoaderComponent,
    PageTitleComponent,
    ComboFranquiasComponent,
    PeriodoComponent,
    MaskDateDirective,
    TreeTableComponent,
    EmptyContentComponent,
    ButtonFilterComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule,
    AccordionModule,
    AlertModule,
    ButtonsModule,
    CarouselModule,
    CollapseModule,
    DatepickerModule,
    BsDatepickerModule,
    BsDropdownModule,
    ModalModule,
    PaginationModule,
    ProgressbarModule,
    RatingModule,
    TabsModule,
    TimepickerModule,
    TooltipModule,
    PopoverModule,
    TypeaheadModule,
    // ToasterModule,
    FlotDirective,
    SparklineDirective,
    EasypiechartDirective,
    CheckallDirective,
    VectormapDirective,
    NowDirective,
    ScrollableDirective,
    JqcloudDirective,
    CardComponent,
    TipoPagamentoComponent,
    MensalComponent,
    HistoricoComponent,
    AcumuladosComponent,
    TopProdutosComponent,
    IndicadoresComponent,
    SkeletonLoaderComponent,
    PageTitleComponent,
    PeriodoComponent,
    ComboFranquiasComponent,
    MaskDateDirective,
    TreeTableComponent,
    EmptyContentComponent,
    ButtonFilterComponent,
  ],
})

// https://github.com/ocombe/ng2-translate/issues/209
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
    };
  }
}
