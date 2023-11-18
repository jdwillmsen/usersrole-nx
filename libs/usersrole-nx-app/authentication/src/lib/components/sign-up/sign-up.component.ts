import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CONFIRM_PASSWORD_REQUIRED_VALIDATION_MESSAGE,
  CreateUserRequest,
  DISPLAY_NAME_REQUIRED_VALIDATION_MESSAGE,
  EMAIL_PATTERN_VALIDATION_MESSAGE,
  EMAIL_REQUIRED_VALIDATION_MESSAGE,
  EMAIL_VALIDATOR_PATTERN,
  PASSWORD_MATCH_VALIDATION_MESSAGE,
  PASSWORD_MIN_LENGTH_VALIDATION_MESSAGE,
  PASSWORD_REQUIRED_VALIDATION_MESSAGE,
  Role,
  SIGN_UP_SUCCESS_MESSAGE,
} from '@usersrole-nx/shared';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { SnackbarService, UsersService } from '@usersrole-nx/core';
import { Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'usersrole-nx-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatCardModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  hide = true;
  signUpForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(EMAIL_VALIDATOR_PATTERN),
      ],
    }),
    displayName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    matchingPassword: new FormGroup(
      {
        password: new FormControl('', {
          nonNullable: true,
          validators: [Validators.required, Validators.minLength(6)],
        }),
        confirmPassword: new FormControl('', {
          nonNullable: true,
          validators: [Validators.required, Validators.minLength(6)],
        }),
      },
      { validators: this.passwordMatch() },
    ),
  });
  validationMessages = {
    email: [
      { type: 'required', message: EMAIL_REQUIRED_VALIDATION_MESSAGE },
      { type: 'pattern', message: EMAIL_PATTERN_VALIDATION_MESSAGE },
    ],
    displayName: [
      { type: 'required', message: DISPLAY_NAME_REQUIRED_VALIDATION_MESSAGE },
    ],
    password: [
      { type: 'required', message: PASSWORD_REQUIRED_VALIDATION_MESSAGE },
      {
        type: 'minlength',
        message: PASSWORD_MIN_LENGTH_VALIDATION_MESSAGE,
      },
    ],
    confirmPassword: [
      {
        type: 'required',
        message: CONFIRM_PASSWORD_REQUIRED_VALIDATION_MESSAGE,
      },
      {
        type: 'minlength',
        message: PASSWORD_MIN_LENGTH_VALIDATION_MESSAGE,
      },
    ],
    matchingPassword: [
      { type: 'passwordMatch', message: PASSWORD_MATCH_VALIDATION_MESSAGE },
    ],
  };

  constructor(
    private usersService: UsersService,
    private router: Router,
    private snackbarService: SnackbarService,
  ) {}

  signUp() {
    const emailControl = this.signUpForm.get('email');
    const displayNameControl = this.signUpForm.get('displayName');
    const matchingPasswordControl = this.signUpForm.get('matchingPassword');
    if (
      emailControl &&
      displayNameControl &&
      matchingPasswordControl &&
      emailControl.valid &&
      displayNameControl.valid &&
      matchingPasswordControl.valid
    ) {
      const email = emailControl.value;
      const displayName = displayNameControl.value;
      const passwordControl = matchingPasswordControl.get('password');
      if (passwordControl) {
        const password = passwordControl.value;
        const roles: Role[] = ['user'];
        const user: CreateUserRequest = { email, displayName, password, roles };
        this.usersService.create(user).subscribe({
          next: () => {
            this.signUpForm.reset();
            this.snackbarService.success(
              SIGN_UP_SUCCESS_MESSAGE,
              {
                variant: 'filled',
                autoClose: true,
              },
              true,
            );
            this.router.navigate(['sign-in']);
          },
        });
      }
    }
  }

  passwordMatch(): ValidatorFn {
    return () => {
      const matches =
        this.signUpForm?.controls.matchingPassword.get('password')?.value ===
        this.signUpForm?.controls.matchingPassword.get('confirmPassword')
          ?.value;
      return !matches ? { passwordMatch: true } : null;
    };
  }

  getErrorMessage(
    formControlName: 'email' | 'displayName' | 'matchingPassword',
  ) {
    for (const validation of this.validationMessages[formControlName]) {
      if (this.signUpForm.get(formControlName)?.hasError(validation.type)) {
        return validation.message;
      }
    }
    return '';
  }

  getPasswordErrorMessage(formControlName: 'password' | 'confirmPassword') {
    for (const validation of this.validationMessages[formControlName]) {
      if (
        this.signUpForm
          .get('matchingPassword')
          ?.get(formControlName)
          ?.hasError(validation.type)
      ) {
        return validation.message;
      }
    }
    return '';
  }
}
