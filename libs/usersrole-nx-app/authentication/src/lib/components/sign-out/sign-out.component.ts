import { Component, inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { AuthenticationService, ThemeStorageService } from '@usersrole-nx/core';

@Component({
  selector: 'usersrole-nx-sign-out',
  imports: [MatButtonModule],
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss'],
})
export class SignOutComponent {
  private authenticationService = inject(AuthenticationService);
  private themeStorageService = inject(ThemeStorageService);

  logout() {
    this.authenticationService.authLogout();
    this.themeStorageService.clearStorage();
    removeCustomTheme();
  }
}

function removeCustomTheme() {
  const palettes = ['primary', 'accent', 'warn', 'success', 'error', 'info'];
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

  for (const palette of palettes) {
    for (const color of colors) {
      document.documentElement.style.removeProperty(`--${palette}-${color}`);
      document.documentElement.style.removeProperty(
        `--${palette}-contrast-${color}`,
      );
    }
  }
}
