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
import { NavigationItem } from '@usersrole-nx/shared-ui';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { GithubButtonComponent } from '@usersrole-nx/shared';

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
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  appTitle = 'Users Role NX';
  appRouterLink = '';
  appToolTip = 'Home';
  headerColor: ThemePalette = 'primary';
  isXSmallScreen = false;
  isSideNavOpened = false;
  isSideNavEnabled = true;
  sideNavMode: MatDrawerMode = 'side';
  githubLink = 'https://github.com/jdwillmsen/usersrole-nx';
  // TODO: Extract this out to a service or routes possibly
  // TODO: Investigate how roles can fit in here
  navigationItems: NavigationItem[] = [
    {
      path: '/home',
      icon: 'home',
      title: 'Home',
    },
    {
      path: '/user/profile',
      icon: 'person',
      title: 'Profile',
    },
    {
      path: '/preview/alerts',
      icon: 'notification_important',
      title: 'Alerts',
    },
    {
      path: '/preview/snackbars',
      icon: 'announcement',
      title: 'Snackbars',
    },
    {
      path: '/preview/buttons',
      icon: 'ballot',
      title: 'Buttons',
    },
    {
      path: '/theme/view',
      icon: 'format_color_fill',
      title: 'Palettes',
    },
    {
      path: '/theme/create',
      icon: 'color_lens',
      title: 'Theme',
    },
    {
      path: '/admin/users',
      icon: 'supervised_user_circle',
      title: 'Users',
    },
    {
      path: '/admin/roles',
      icon: 'lock',
      title: 'Roles',
    },
  ];

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe(Breakpoints.XSmall).subscribe((result) => {
      this.isXSmallScreen = result.matches;
      this.updateNavigationBasedOnScreenSize();
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
}
