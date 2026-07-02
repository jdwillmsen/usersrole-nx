import { Component, Inject } from '@angular/core';

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
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: SnackbarData,
    public snackbarRef: MatSnackBarRef<SnackbarComponent>,
  ) {}
}
