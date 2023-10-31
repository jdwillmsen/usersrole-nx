import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavigationItemComponent } from '../navigation-item/navigation-item.component';
import { NavigationItem } from '../../models/navigation-item.model';

@Component({
  selector: 'usersrole-nx-navigation-layout',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    NavigationItemComponent,
  ],
  templateUrl: './navigation-layout.component.html',
  styleUrls: ['./navigation-layout.component.scss'],
})
export class NavigationLayoutComponent {
  @Input() isSideNavEnabled = true;
  @Input() sideNavMode: MatDrawerMode = 'side';
  @Input() isSideNavOpened = true;
  @Input() navigationItems: NavigationItem[] = [];
  @Output() sideNavChange = new EventEmitter<boolean>();
  isExpanded = false;

  toggleSideNav() {
    this.isExpanded = !this.isExpanded;
  }

  openedChanged(isOpen: boolean) {
    this.sideNavChange.emit(isOpen);
  }
}
