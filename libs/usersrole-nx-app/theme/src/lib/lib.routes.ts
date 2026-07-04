import { Route } from '@angular/router';
import { ViewPalettesComponent } from './components/view-palettes/view-palettes.component';
import { CreateThemeComponent } from './components/create-theme/create-theme.component';
import { authGuard } from '@usersrole-nx/core';

export const themeRoutes: Route[] = [
  {
    path: 'view',
    component: ViewPalettesComponent,
    canActivate: [authGuard],
  },
  {
    path: 'create',
    component: CreateThemeComponent,
    canActivate: [authGuard],
  },
];
