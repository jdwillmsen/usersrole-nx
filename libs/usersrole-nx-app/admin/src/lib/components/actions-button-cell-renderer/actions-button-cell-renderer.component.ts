import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICellRendererParams } from 'ag-grid-community';
import { SnackbarService, UsersService } from '@usersrole-nx/core';
import { MatDialog } from '@angular/material/dialog';
import {
  User,
  USER_DELETED_SUCCESS_MESSAGE,
  USER_EDITED_SUCCESS_MESSAGE,
} from '@usersrole-nx/shared';
import { UserFormComponent } from '../user-form/user-form.component';
import { UserFormService } from '../../services/user-form/user-form.service';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'usersrole-nx-actions-button-cell-renderer',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatTooltipModule, MatIconModule],
  templateUrl: './actions-button-cell-renderer.component.html',
  styleUrls: ['./actions-button-cell-renderer.component.scss'],
})
export class ActionsButtonCellRendererComponent
  implements ICellRendererAngularComp
{
  private params!: ICellRendererParams;

  constructor(
    private userService: UsersService,
    private dialog: MatDialog,
    private userFormService: UserFormService,
    private snackbarService: SnackbarService
  ) {}

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  viewUser() {
    this.view(this.params.data);
  }

  editUser() {
    this.edit(this.params.data);
  }

  deleteUser() {
    this.delete(this.params.data);
  }

  refresh() {
    return false;
  }

  edit(userToEdit: User) {
    this.userFormService.edit(userToEdit);
    const dialogRef = this.dialog.open(UserFormComponent, { minWidth: 350 });
    dialogRef.afterClosed().subscribe({
      next: (user) => {
        if (user) {
          this.userService.edit(user).subscribe(() => {
            this.snackbarService.success(
              USER_EDITED_SUCCESS_MESSAGE,
              {
                variant: 'filled',
                autoClose: true,
              },
              true
            );
          });
        }
      },
    });
  }

  view(userToView: User) {
    this.userFormService.view(userToView);
    this.dialog.open(UserFormComponent, { minWidth: 350 });
  }

  delete(userToDelete: User) {
    this.userFormService.delete(userToDelete);
    const dialogRef = this.dialog.open(UserFormComponent, { minWidth: 350 });
    dialogRef.afterClosed().subscribe({
      next: (user) => {
        if (user) {
          this.userService.delete(user).subscribe(() => {
            this.snackbarService.success(
              USER_DELETED_SUCCESS_MESSAGE,
              {
                variant: 'filled',
                autoClose: true,
              },
              true
            );
          });
        }
      },
    });
  }
}
