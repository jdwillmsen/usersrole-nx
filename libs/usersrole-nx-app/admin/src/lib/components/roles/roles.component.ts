import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  Role,
  RoleOption,
  ROLES_ASSIGNED_SUCCESS_MESSAGE,
  User,
} from '@usersrole-nx/shared';
import { SnackbarService, UsersService } from '@usersrole-nx/core';
import { RolesService } from '../../services/roles/roles.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'usersrole-nx-roles',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
  ],
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  rolesForm = new FormGroup(
    {
      usersName: new FormControl<string | User>('', {
        nonNullable: true,
        validators: [Validators.required, userSelectionRequiredValidator],
      }),
      roles: new FormControl<Role[]>([], {
        nonNullable: true,
        validators: [Validators.required],
      }),
    },
    { validators: this.rolesAreDifferent() },
  );
  options$!: Observable<User[]>;
  filteredOptions$!: Observable<User[]>;
  rolesOptions: RoleOption[] = [
    {
      value: 'admin',
      display: 'Admin',
    },
    {
      value: 'manager',
      display: 'Manager',
    },
    {
      value: 'user',
      display: 'User',
    },
    {
      value: 'read',
      display: 'Read',
    },
  ];
  private filteredOptionsSubject = new BehaviorSubject<User[]>([]);

  constructor(
    private usersService: UsersService,
    private rolesService: RolesService,
    private snackbarService: SnackbarService,
  ) {}

  ngOnInit() {
    this.filteredOptions$ = this.filteredOptionsSubject.asObservable();
    this.options$ = this.usersService.users$.pipe(
      tap((users) => {
        this.filteredOptionsSubject.next(users);
      }),
    );
    this.rolesForm.controls.usersName.valueChanges.subscribe((user) => {
      if (user && typeof user !== 'string')
        this.rolesForm.controls.roles.setValue(user.roles);
    });
  }

  displayFn(rolesOption: User): string {
    return rolesOption && rolesOption.displayName
      ? `${rolesOption.displayName} (${rolesOption.uid})`
      : '';
  }

  resetForm() {
    this.rolesForm.reset();
  }

  onAutocompleteKeyUp(searchText: string, options: User[]): void {
    const lowerSearchText = searchText.toLowerCase();
    this.filteredOptionsSubject.next(
      !lowerSearchText
        ? options
        : options.filter((option) =>
            option.displayName.toLowerCase().includes(lowerSearchText),
          ),
    );
  }

  onAssign() {
    if (
      typeof this.rolesForm.controls.usersName.value !== 'string' &&
      this.rolesForm.valid
    ) {
      this.rolesService
        .update({
          uid: this.rolesForm.controls.usersName.value.uid,
          roles: this.rolesForm.controls.roles.value,
        })
        .subscribe({
          next: () => {
            this.snackbarService.success(
              ROLES_ASSIGNED_SUCCESS_MESSAGE,
              {
                variant: 'filled',
                autoClose: true,
              },
              true,
            );
          },
        });
    }
  }

  rolesAreDifferent(): ValidatorFn {
    const compareArrays = (arr1: Role[], arr2: Role[]) =>
      arr1 &&
      arr2 &&
      arr1.length === arr2.length &&
      arr1.every((role, index) => role === arr2[index]);
    return () => {
      const matches =
        typeof this.rolesForm?.controls.usersName?.value !== 'string'
          ? compareArrays(
              this.rolesForm?.controls.usersName?.value.roles,
              this.rolesForm?.controls.roles?.value,
            )
          : false;
      return matches ? { noMatchRequired: true } : null;
    };
  }
}

function instanceOfUser(user: unknown): user is User {
  if (typeof user !== 'object' || user === null) {
    return false;
  }
  return (
    'uid' in user && 'displayName' in user && 'roles' in user && 'email' in user
  );
}

const userSelectionRequiredValidator: ValidatorFn = (
  control: AbstractControl,
) => {
  return !instanceOfUser(control?.value) ? { matchRequired: true } : null;
};
