import { LayoutComponent } from '../layout/layout.component'
import { AuthGuard } from './../core/guards/auth.guard'
import { LoginComponent } from './pages/login/login.component'

export const routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((h) => h.HomeModule),
      },
      {
        path: 'franqueado',
        loadChildren: () =>
          import('./pages/reports/franqueado/franqueado.module').then(
            (f) => f.FranqueadoModule
          ),
      },
    ],
  },

  {
    path: 'login',
    component: LoginComponent,
  },

  // Not found
  { path: '**', redirectTo: '' },
]
