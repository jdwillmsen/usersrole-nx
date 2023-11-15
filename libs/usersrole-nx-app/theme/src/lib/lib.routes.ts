import { Route } from '@angular/router';
import { ViewPalettesComponent } from './components/view-palettes/view-palettes.component';
import { CreateThemeComponent } from './components/create-theme/create-theme.component';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { redirectUnauthorizedToLogin } from '@usersrole-nx/core';

export const themeRoutes: Route[] = [
  {
    path: 'view',
    component: ViewPalettesComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin,
    },
  },
  {
    path: 'create',
    component: CreateThemeComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin,
    },
  },
];
