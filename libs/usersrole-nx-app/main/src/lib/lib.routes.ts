import { Route } from '@angular/router';
import { NavigationItemComponent } from '@usersrole-nx/shared-ui';
import { HomeComponent } from './components/home/home.component';

export const libRoutes: Route[] = [
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
    path: '',
    component: NavigationItemComponent,
  },
  {
    path: 'testing',
    component: NavigationItemComponent,
  },
  {
    path: 'theme',
    component: NavigationItemComponent,
  },
  {
    path: '**',
    redirectTo: 'sign-in',
  },
];
