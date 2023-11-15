import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HeaderComponent,
  NavigationLayoutComponent,
} from '@usersrole-nx/shared-ui';
import { ThemePalette } from '@angular/material/core';
import { RouterOutlet } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDrawerMode } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { GithubButtonComponent } from '@usersrole-nx/shared';
import { SignOutCardComponent } from '@usersrole-nx/authentication';
import { ThemeSelectorComponent } from '../theme-selector/theme-selector.component';
import { AuthenticationService, SnackbarService } from '@usersrole-nx/core';
import firebase from 'firebase/compat/app';
import { NavigationService } from '../../services/navigation/navigation.service';

@Component({
  selector: 'usersrole-nx-main',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    NavigationLayoutComponent,
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
    GithubButtonComponent,
    SignOutCardComponent,
    ThemeSelectorComponent,
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  appTitle = 'Users Role NX';
  appRouterLink = '/home';
  appToolTip = 'Home';
  headerColor: ThemePalette = 'primary';
  isXSmallScreen = false;
  isSideNavOpened = false;
  sideNavMode: MatDrawerMode = 'side';
  githubLink = 'https://github.com/jdwillmsen/usersrole-nx';
  user: firebase.User | null = null;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authenticationService: AuthenticationService,
    private snackbarService: SnackbarService,
    private navigationService: NavigationService
  ) {
    this.breakpointObserver.observe(Breakpoints.XSmall).subscribe((result) => {
      this.isXSmallScreen = result.matches;
      this.updateNavigationBasedOnScreenSize();
    });
    this.authenticationService.user$.subscribe({
      next: (user) => (this.user = user),
      error: (error) =>
        this.snackbarService.error(error.error, { variant: 'filled' }, true),
    });
  }

  handleToggle() {
    this.isSideNavOpened = !this.isSideNavOpened;
  }

  sideNavChange(isOpen: boolean) {
    this.isSideNavOpened = isOpen;
  }

  updateNavigationBasedOnScreenSize() {
    if (this.isXSmallScreen) {
      this.sideNavMode = 'over';
      this.isSideNavOpened = false;
    } else {
      this.sideNavMode = 'side';
      this.isSideNavOpened = true;
    }
  }

  navigationItems() {
    return this.navigationService.getNavigationItems();
  }
}
