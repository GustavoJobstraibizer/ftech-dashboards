import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NavsearchComponent } from './header/navsearch/navsearch.component';
import { LayoutComponent } from './layout.component';
import { OffsidebarComponent } from './offsidebar/offsidebar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserblockComponent } from './sidebar/userblock/userblock.component';
import { UserblockService } from './sidebar/userblock/userblock.service';

@NgModule({
  imports: [SharedModule],
  providers: [UserblockService],
  declarations: [
    LayoutComponent,
    SidebarComponent,
    UserblockComponent,
    HeaderComponent,
    NavsearchComponent,
    OffsidebarComponent,
    FooterComponent,
  ],
  exports: [
    LayoutComponent,
    SidebarComponent,
    UserblockComponent,
    HeaderComponent,
    NavsearchComponent,
    OffsidebarComponent,
    FooterComponent,
  ],
})
export class LayoutModule {}
