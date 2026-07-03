import { Component, InjectionToken, inject } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { SnackbarData } from '../../models/snackbar.model';

@Component({
    selector: 'usersrole-nx-snackbar',
    imports: [MatIconModule, MatButtonModule],
    templateUrl: './snackbar.component.html',
    styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent {
  // MAT_SNACK_BAR_DATA is InjectionToken<any>; the double cast keeps the
  // functions build (node10 module resolution) from rejecting the token
  // identity while still typing the injected value.
  data = inject(MAT_SNACK_BAR_DATA as unknown as InjectionToken<SnackbarData>);
  snackbarRef = inject<MatSnackBarRef<SnackbarComponent>>(MatSnackBarRef);
}
