import { Route } from '@angular/router';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { EmailSignInComponent } from './components/email-sign-in/email-sign-in.component';

export const authenticationRoutes: Route[] = [
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'sign-in', component: EmailSignInComponent },
];
