import { Route } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { RolesComponent } from './components/roles/roles.component';

export const adminRoutes: Route[] = [
  { path: '', component: AdminComponent },
  { path: 'users', component: AdminComponent },
  { path: 'roles', component: RolesComponent },
];
