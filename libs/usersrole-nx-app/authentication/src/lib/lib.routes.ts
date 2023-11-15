import { Route } from '@angular/router';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import {
  redirectLoggedInToHome,
  redirectUnauthorizedToLogin,
} from '@usersrole-nx/core';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';

export const authenticationRoutes: Route[] = [
  {
    path: 'forbidden',
    component: ForbiddenComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin,
    },
  },
  {
    path: 'sign-in',
    component: SignInComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectLoggedInToHome,
    },
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectLoggedInToHome,
    },
  },
];
