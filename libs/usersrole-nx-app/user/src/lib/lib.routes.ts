import { Route } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { redirectUnauthorizedToLogin } from '@usersrole-nx/core';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';

export const userRoutes: Route[] = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin,
    },
  },
];
