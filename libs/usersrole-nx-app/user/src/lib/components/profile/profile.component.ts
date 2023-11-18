import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Role, User } from '@usersrole-nx/shared';
import { filter, Observable, switchMap, tap } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UsersService } from '@usersrole-nx/core';
import firebase from 'firebase/compat/app';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'usersrole-nx-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
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
    private angularFireAuth: AngularFireAuth,
    private usersService: UsersService,
  ) {}

  ngOnInit() {
    this.user$ = this.angularFireAuth.user.pipe(
      filter((user): user is firebase.User => !!user),
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
