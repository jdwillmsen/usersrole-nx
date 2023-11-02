import { Route } from '@angular/router';
import { mainRoutes } from '@usersrole-nx/main';
export const appRoutes: Route[] = [
  {
    path: '',
    children: mainRoutes,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
