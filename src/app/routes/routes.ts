import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './../core/guards/auth.guard';
import { LayoutComponent } from '../layout/layout.component';

export const routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((h) => h.HomeModule),
      },
    ],
  },

  {
    path: 'login',
    component: LoginComponent,
  },

  // Not found
  { path: '**', redirectTo: '' },
];
