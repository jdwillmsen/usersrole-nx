import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Icon, SnackbarOptions, Variant } from '@usersrole-nx/shared';
import { SnackbarService } from '@usersrole-nx/core';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'usersrole-nx-snackbars',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCheckboxModule,
  ],
  templateUrl: './snackbars.component.html',
  styleUrls: ['./snackbars.component.scss'],
})
export class SnackbarsComponent {
  options: SnackbarOptions = {
    variant: 'filled',
    autoClose: false,
    autoCloseTimeout: 3000,
    icon: undefined,
    buttonText: undefined,
    direction: undefined,
    horizontalPosition: 'end',
    verticalPosition: 'bottom',
  };
  defaultIcons = false;
  message = 'Snackbar Message';
  horizontalPositionList: MatSnackBarHorizontalPosition[] = [
    'start',
    'end',
    'center',
    'left',
    'right',
  ];
  verticalPositionList: MatSnackBarVerticalPosition[] = ['top', 'bottom'];
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
  variant = new FormControl(this.variantList[1]);
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

  constructor(protected snackbarService: SnackbarService) {}

  getOptions(): SnackbarOptions {
    this.options.variant = this.variant.value?.value;
    return { ...this.options };
  }
}
