import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'torneos',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/auth/login/login.component')
        .then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/auth/register/register.component')
        .then(m => m.RegisterComponent)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ROLE_ADMIN'] },
    loadComponent: () =>
      import('./components/dashboard/dashboard.component')
        .then(m => m.DashboardComponent)
  },
  {
    path: 'torneos',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/torneos/torneos.component')
        .then(m => m.TorneosComponent)
  },
  {
    path: 'participantes',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ROLE_ADMIN'] },
    loadComponent: () =>
      import('./components/participantes/participantes.component')
        .then(m => m.ParticipantesComponent)
  },
  {
    path: 'torneos/:id/encuentros',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/encuentros/encuentros.component')
        .then(m => m.EncuentrosComponent)
  },
  {
    path: 'torneos/:id/tabla',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/tabla/tabla.component')
        .then(m => m.TablaComponent)
  },
  {
    path: '**',
    redirectTo: 'torneos'
  }
];