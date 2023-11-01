import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () => import('@usersrole-nx/main').then((m) => m.libRoutes),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
