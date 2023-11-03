import { Route } from '@angular/router';
import { ViewPalettesComponent } from './components/view-palettes/view-palettes.component';
import { CreateThemeComponent } from './components/create-theme/create-theme.component';

export const themeRoutes: Route[] = [
  { path: 'view', component: ViewPalettesComponent },
  { path: 'create', component: CreateThemeComponent },
];
