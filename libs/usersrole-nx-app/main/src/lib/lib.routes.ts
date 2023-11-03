import { Route } from '@angular/router';
import { NavigationItemComponent } from '@usersrole-nx/shared-ui';
import { HomeComponent } from './components/home/home.component';

export const mainRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'profile',
    component: NavigationItemComponent,
  },
  {
    path: 'admin',
    component: NavigationItemComponent,
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
