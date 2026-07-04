import { Route } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { authGuard } from '@usersrole-nx/core';

export const userRoutes: Route[] = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],
  },
];
