import { Component, Input } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NavigationItem } from '../../models/navigation-item.model';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'usersrole-nx-navigation-item',
    imports: [
    MatIconModule,
    MatListModule,
    RouterLinkActive,
    RouterLink
],
    templateUrl: './navigation-item.component.html',
    styleUrls: ['./navigation-item.component.scss']
})
export class NavigationItemComponent {
  @Input() navigationItem: NavigationItem = {
    path: '',
    icon: '',
    title: '',
  };
  @Input() isExpanded = false;
  // TODO: Add and figure out how the styles will work with a library _navigation-item-theme.scss
}
