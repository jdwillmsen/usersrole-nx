import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Role, User } from '@usersrole-nx/shared';
import { filter, Observable, switchMap, tap } from 'rxjs';
import { Auth, User as FirebaseUser } from 'firebase/auth';
import { user } from 'rxfire/auth';
import { AUTH, UsersService } from '@usersrole-nx/core';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'usersrole-nx-profile',
    imports: [CommonModule, ReactiveFormsModule, MatInputModule, FormsModule],
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm = new FormGroup({
    email: new FormControl(''),
    displayName: new FormControl(''),
    roles: new FormControl<Role[]>([]),
  });
  user$!: Observable<User>;
  displayRoles = '';

  constructor(
    @Inject(AUTH) private auth: Auth,
    private usersService: UsersService,
  ) {}

  ngOnInit() {
    this.user$ = user(this.auth).pipe(
      filter((user): user is FirebaseUser => !!user),
      switchMap((user) =>
        this.usersService.user$(user.uid).pipe(
          tap((user) => {
            if (user) {
              this.profileForm.patchValue(user);
              this.displayRoles = user.roles
                .map((role) => capitalizeFirstLetter(role))
                .join(', ');
            }
          }),
        ),
      ),
    );
  }
}

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
