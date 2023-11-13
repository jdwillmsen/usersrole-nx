import { Route } from '@angular/router';
import { RolesComponent } from './components/roles/roles.component';
import { UsersComponent } from './components/users/users.component';

export const adminRoutes: Route[] = [
  { path: 'users', component: UsersComponent },
  { path: 'roles', component: RolesComponent },
];
