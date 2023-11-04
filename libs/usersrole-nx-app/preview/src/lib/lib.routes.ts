import { Route } from '@angular/router';
import { AlertsComponent } from './components/alerts/alerts.component';
import { ButtonsComponent } from './components/buttons/buttons.component';

export const previewRoutes: Route[] = [
  { path: 'alerts', component: AlertsComponent },
  { path: 'buttons', component: ButtonsComponent },
];
