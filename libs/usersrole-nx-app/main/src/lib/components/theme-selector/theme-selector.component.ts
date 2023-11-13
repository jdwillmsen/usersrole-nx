import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Palette, SiteTheme, Theme } from '@usersrole-nx/shared';
import {
  AuthenticationService,
  FirestoreService,
  SnackbarService,
  StyleManagerService,
  ThemeStorageService,
} from '@usersrole-nx/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'usersrole-nx-theme-selector',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatIconModule, MatButtonModule],
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.scss'],
})
export class ThemeSelectorComponent {
  currentTheme: SiteTheme | undefined;
  themes: SiteTheme[];
  uid = '';
  customLightTheme: Theme | null = null;
  customDarkTheme: Theme | null = null;

  constructor(
    private styleManagerService: StyleManagerService,
    private firestoreService: FirestoreService,
    private authenticationService: AuthenticationService,
    private snackbarService: SnackbarService,
    private _themeStorageService: ThemeStorageService
  ) {
    this.themes = this.styleManagerService.getThemes();
    const themeName = _themeStorageService.getStoredThemeName();
    if (themeName) {
      this.selectTheme(themeName);
    }
    this.authenticationService.user$.subscribe({
      next: (user) => {
        if (user !== null) {
          this.uid = user.uid;
          this.firestoreService.getUsersDoc(this.uid).then((data) => {
            if (data) {
              this.selectTheme(
                data['theme'],
                data['lightTheme'],
                data['darkTheme']
              );
              this.customLightTheme = data['lightTheme'];
              this.customDarkTheme = data['darkTheme'];
            } else {
              this.themes.find((themes) => {
                if (themes.isDefault === true) {
                  this.selectTheme(themes.name);
                  this.firestoreService.setThemeName(this.uid, themes.name);
                }
              });
            }
          });
        }
      },
      error: (error: { error: any }) =>
        this.snackbarService.error(error.error, { variant: 'filled' }, true),
    });
    this.styleManagerService.currentThemeName.subscribe((themeName: string) => {
      if (this.currentTheme?.name !== themeName) {
        if (this.customLightTheme && themeName === 'custom-light') {
          this.applyCustomTheme(this.customLightTheme);
        }
        if (this.customDarkTheme && themeName === 'custom-dark') {
          this.applyCustomTheme(this.customDarkTheme);
        }
        this.firestoreService.setThemeName(this.uid, themeName);
      }
    });
  }

  selectTheme(themeName: string, lightTheme?: Theme, darkTheme?: Theme) {
    const theme = this.themes.find(
      (currentTheme) => currentTheme.name === themeName
    );

    if (!theme) {
      return;
    }

    this.styleManagerService.currentThemeName.next(themeName);
    this.currentTheme = theme;
    this.styleManagerService.setStyle('theme', `${theme.name}.css`);

    if (lightTheme && theme.name === 'custom-light') {
      this.applyCustomTheme(lightTheme);
    }

    if (darkTheme && theme.name === 'custom-dark') {
      this.applyCustomTheme(darkTheme);
    }

    if (this.currentTheme) {
      this._themeStorageService.storeTheme(this.currentTheme);
    }
  }

  applyCustomTheme(theme: Theme) {
    this.applyCustomPalette('primary', theme.primaryPalette);
    this.applyCustomPalette('accent', theme.accentPalette);
    this.applyCustomPalette('warn', theme.warnPalette);
    this.applyCustomPalette('success', theme.successPalette);
    this.applyCustomPalette('error', theme.errorPalette);
    this.applyCustomPalette('info', theme.infoPalette);
  }

  applyCustomPalette(paletteName: string, palette: Palette) {
    const colors: string[] = [
      '50',
      '100',
      '200',
      '300',
      '400',
      '500',
      '600',
      '700',
      '800',
      '900',
      'A100',
      'A200',
      'A400',
      'A700',
    ];
    for (const color of colors) {
      const paletteColor = `color${color}`;
      const paletteContrastColor = `colorContrast${color}`;
      document.documentElement.style.setProperty(
        `--${paletteName}-${color}`,
        palette[paletteColor]
      );
      document.documentElement.style.setProperty(
        `--${paletteName}-contrast-${color}`,
        palette[paletteContrastColor]
      );
    }
  }
}
