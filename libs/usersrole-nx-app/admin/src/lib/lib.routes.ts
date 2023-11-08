import { Route } from '@angular/router';
import { AdminComponent } from './admin/admin.component';

export const adminRoutes: Route[] = [
  { path: '', component: AdminComponent },
  { path: 'users', component: AdminComponent },
  { path: 'roles', component: AdminComponent },
];
