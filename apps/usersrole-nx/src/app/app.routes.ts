import { Route } from '@angular/router';
import { libRoutes } from '@usersrole-nx/main';
export const appRoutes: Route[] = [
  {
    path: '',
    children: libRoutes,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
