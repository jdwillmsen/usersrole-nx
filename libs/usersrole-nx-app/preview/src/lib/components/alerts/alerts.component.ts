import { Component, inject } from '@angular/core';

import { AlertService } from '../../services/alert/alert.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertOptions, Icon, Variant } from '@usersrole-nx/shared';
import { AlertComponent } from '../alert/alert.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
    selector: 'usersrole-nx-alerts',
    imports: [
    AlertComponent,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    MatCheckboxModule,
    ReactiveFormsModule
],
    templateUrl: './alerts.component.html',
    styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent {
  protected alertService = inject(AlertService);

  options: AlertOptions = {
    autoClose: false,
    autoCloseTimeout: 3000,
    keepAfterRouteChange: false,
    icon: undefined,
    closeButton: true,
    maxSize: undefined,
  };
  defaultIcons = false;
  fade = false;
  fadeTime = 500;
  iconList: Icon[] = [
    {
      display: 'Delete',
      value: 'delete',
    },
    {
      display: 'Settings',
      value: 'settings',
    },
    {
      display: 'Search',
      value: 'shopping_cart',
    },
    {
      display: 'New Releases',
      value: 'new_releases',
    },
  ];
  variantList: Variant[] = [
    {
      display: 'Default',
      value: 'default',
    },
    {
      display: 'Filled',
      value: 'filled',
    },
    {
      display: 'Outlined',
      value: 'outlined',
    },
  ];
  variant = new FormControl(this.variantList[0]);
}
