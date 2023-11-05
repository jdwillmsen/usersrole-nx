import { Route } from '@angular/router';
import { AlertsComponent } from './components/alerts/alerts.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { SnackbarsComponent } from './components/snackbars/snackbars.component';

export const previewRoutes: Route[] = [
  { path: 'alerts', component: AlertsComponent },
  { path: 'buttons', component: ButtonsComponent },
  { path: 'snackbars', component: SnackbarsComponent },
];
