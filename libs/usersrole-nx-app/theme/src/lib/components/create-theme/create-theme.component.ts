import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CreatePaletteComponent } from '../create-palette/create-palette.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PaletteFormGroup } from '../../models/palette-form-group';
import {
  DARK_THEME_SAVED_SUCCESS_MESSAGE,
  LIGHT_THEME_SAVED_SUCCESS_MESSAGE,
  PaletteColors,
  Theme,
} from '@usersrole-nx/shared';
import {
  AuthenticationService,
  FirestoreService,
  SnackbarService,
} from '@usersrole-nx/core';

@Component({
  selector: 'usersrole-nx-create-theme',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CreatePaletteComponent,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './create-theme.component.html',
  styleUrls: ['./create-theme.component.scss'],
})
export class CreateThemeComponent {
  themeForm = new FormGroup({
    primaryPalette: new FormGroup(new PaletteFormGroup().paletteFormGroup),
    accentPalette: new FormGroup(new PaletteFormGroup().paletteFormGroup),
    warnPalette: new FormGroup(new PaletteFormGroup().paletteFormGroup),
    successPalette: new FormGroup(new PaletteFormGroup().paletteFormGroup),
    errorPalette: new FormGroup(new PaletteFormGroup().paletteFormGroup),
    infoPalette: new FormGroup(new PaletteFormGroup().paletteFormGroup),
  });
  palettes: { name: string; type: PaletteColors }[] = [
    { name: 'primaryPalette', type: 'primary' },
    { name: 'accentPalette', type: 'accent' },
    { name: 'warnPalette', type: 'warn' },
    { name: 'successPalette', type: 'success' },
    { name: 'errorPalette', type: 'error' },
    { name: 'infoPalette', type: 'info' },
  ];
  uid = '';

  constructor(
    private firestoreService: FirestoreService,
    private authenticationService: AuthenticationService,
    private snackbarService: SnackbarService,
  ) {
    this.authenticationService.user$.subscribe({
      next: (user) => {
        if (user !== null) {
          this.uid = user.uid;
        }
      },
      error: (error) => {
        this.snackbarService.error(error.error, { variant: 'filled' }, true);
      },
    });
  }

  saveLightTheme() {
    this.firestoreService
      .setCustomLightTheme(this.uid, this.themeForm.value as Theme)
      .then(() => {
        this.snackbarService.success(
          LIGHT_THEME_SAVED_SUCCESS_MESSAGE,
          { variant: 'filled' },
          true,
        );
      })
      .catch((error) => {
        this.snackbarService.error(error, { variant: 'filled' }, true);
      });
  }

  saveDarkTheme() {
    this.firestoreService
      .setCustomDarkTheme(this.uid, this.themeForm.value as Theme)
      .then(() => {
        this.snackbarService.success(
          DARK_THEME_SAVED_SUCCESS_MESSAGE,
          { variant: 'filled' },
          true,
        );
      })
      .catch((error) => {
        this.snackbarService.error(error, { variant: 'filled' }, true);
      });
  }
}
