import { MobileComponent } from './../login/mobile/mobile.component';
import { SharedModule } from './../../../shared/shared.module';
import { LoginComponent } from './../login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// const routes: Routes = [
//   {
//     path: 'login',
//     component: LoginComponent,
//   },
// ];

@NgModule({
  declarations: [LoginComponent, MobileComponent],
  imports: [SharedModule, CommonModule],
  exports: [LoginComponent, MobileComponent],
})
export class PagesModule {}
