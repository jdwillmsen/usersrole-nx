import { Injectable } from '@angular/core';
import { NavigationItem } from '@usersrole-nx/shared-ui';
import { Role } from '@usersrole-nx/shared';
import { PermissionService } from '@usersrole-nx/core';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  navigationItems: (NavigationItem & { roles?: Role[] })[] = [
    {
      path: '/home',
      icon: 'home',
      title: 'Home',
    },
    {
      path: '/user/profile',
      icon: 'person',
      title: 'Profile',
      roles: ['user'],
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
      roles: ['read', 'admin', 'manager'],
    },
    {
      path: '/admin/roles',
      icon: 'lock',
      title: 'Roles',
      roles: ['read', 'admin', 'manager'],
    },
  ];
  constructor(private permissionService: PermissionService) {}

  getNavigationItems() {
    return this.navigationItems.filter((item) => this.checkRoles(item.roles));
  }

  checkRoles(roles: Role[] | undefined): boolean {
    if (roles == undefined || roles.length == 0) {
      return true;
    }
    return this.permissionService.hasRole(roles);
  }
}
