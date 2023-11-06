import { Route } from '@angular/router';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';

export const authenticationRoutes: Route[] = [
  { path: 'forbidden', component: ForbiddenComponent },
];
