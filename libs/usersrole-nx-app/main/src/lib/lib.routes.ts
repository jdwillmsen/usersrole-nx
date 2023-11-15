import { Route } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { authenticationRoutes } from '@usersrole-nx/authentication';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { redirectUnauthorizedToLogin } from '@usersrole-nx/core';

export const mainRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin,
    },
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
