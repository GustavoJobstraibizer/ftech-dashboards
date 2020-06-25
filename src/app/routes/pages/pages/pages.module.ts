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
  declarations: [LoginComponent],
  imports: [SharedModule, CommonModule],
  exports: [LoginComponent],
})
export class PagesModule {}
