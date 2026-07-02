import { Route } from '@angular/router';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { authGuard, unauthGuard } from '@usersrole-nx/core';

export const authenticationRoutes: Route[] = [
  {
    path: 'forbidden',
    component: ForbiddenComponent,
    canActivate: [authGuard],
  },
  {
    path: 'sign-in',
    component: SignInComponent,
    canActivate: [unauthGuard],
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [unauthGuard],
  },
];
