import { Route } from '@angular/router';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

export const authenticationRoutes: Route[] = [
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
];
