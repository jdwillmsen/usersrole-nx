import { Route } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { authenticationRoutes } from '@usersrole-nx/authentication';
import { authGuard } from '@usersrole-nx/core';

export const mainRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'about',
    component: AboutComponent,
    canActivate: [authGuard],
  },
  {
    path: 'user',
    loadChildren: () => import('@usersrole-nx/user').then((m) => m.userRoutes),
  },
  {
    path: '',
    children: authenticationRoutes,
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('@usersrole-nx/admin').then((m) => m.adminRoutes),
  },
  {
    path: 'preview',
    loadChildren: () =>
      import('@usersrole-nx/preview').then((m) => m.previewRoutes),
  },
  {
    path: 'theme',
    loadChildren: () =>
      import('@usersrole-nx/theme').then((m) => m.themeRoutes),
  },
  {
    path: '**',
    redirectTo: 'sign-in',
  },
];
