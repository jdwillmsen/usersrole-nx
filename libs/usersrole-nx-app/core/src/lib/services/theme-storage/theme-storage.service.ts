import { EventEmitter, Injectable } from '@angular/core';
import { SiteTheme } from '@usersrole-nx/shared';

@Injectable({
  providedIn: 'root',
})
export class ThemeStorageService {
  static storageKey = 'theme-storage-current-name';
  onThemeUpdate: EventEmitter<SiteTheme> = new EventEmitter<SiteTheme>();

  storeTheme(theme: SiteTheme) {
    window.localStorage.setItem(ThemeStorageService.storageKey, theme.name);
    this.onThemeUpdate.emit(theme);
  }

  getStoredThemeName(): string | null {
    return window.localStorage.getItem(ThemeStorageService.storageKey);
  }

  clearStorage() {
    window.localStorage.removeItem(ThemeStorageService.storageKey);
  }
}
