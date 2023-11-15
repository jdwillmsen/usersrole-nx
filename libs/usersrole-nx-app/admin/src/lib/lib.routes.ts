import { Route } from '@angular/router';
import { RolesComponent } from './components/roles/roles.component';
import { UsersComponent } from './components/users/users.component';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { redirectUnauthorizedToLogin, roleGuard } from '@usersrole-nx/core';

export const adminRoutes: Route[] = [
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AngularFireAuthGuard, roleGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin,
      roles: ['read', 'manager', 'admin'],
    },
  },
  {
    path: 'roles',
    component: RolesComponent,
    canActivate: [AngularFireAuthGuard, roleGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin,
      roles: ['read', 'manager', 'admin'],
    },
  },
];
