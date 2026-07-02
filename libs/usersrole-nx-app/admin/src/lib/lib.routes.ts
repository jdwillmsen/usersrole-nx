import { Route } from '@angular/router';
import { RolesComponent } from './components/roles/roles.component';
import { UsersComponent } from './components/users/users.component';
import { authGuard, roleGuard } from '@usersrole-nx/core';

export const adminRoutes: Route[] = [
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [authGuard, roleGuard],
    data: {
      roles: ['read', 'manager', 'admin'],
    },
  },
  {
    path: 'roles',
    component: RolesComponent,
    canActivate: [authGuard, roleGuard],
    data: {
      roles: ['read', 'manager', 'admin'],
    },
  },
];
