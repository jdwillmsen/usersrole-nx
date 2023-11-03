import { Route } from '@angular/router';
import { ViewPalettesComponent } from './components/view-palettes/view-palettes.component';
import { CreatePaletteComponent } from './components/create-palette/create-palette.component';

export const themeRoutes: Route[] = [
  { path: 'view', component: ViewPalettesComponent },
  { path: 'create', component: CreatePaletteComponent },
];
