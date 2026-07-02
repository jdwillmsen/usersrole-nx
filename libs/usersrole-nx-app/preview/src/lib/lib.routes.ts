import { Route } from '@angular/router';
import { AlertsComponent } from './components/alerts/alerts.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { SnackbarsComponent } from './components/snackbars/snackbars.component';
import { authGuard } from '@usersrole-nx/core';

export const previewRoutes: Route[] = [
  {
    path: 'alerts',
    component: AlertsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'buttons',
    component: ButtonsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'snackbars',
    component: SnackbarsComponent,
    canActivate: [authGuard],
  },
];
