import { Component, inject } from '@angular/core';

import {
  AuthenticationService,
  SnackbarService,
  StyleManagerService,
} from '@usersrole-nx/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { catchError, EMPTY, take } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { EmailSignInComponent } from '../email-sign-in/email-sign-in.component';

@Component({
  selector: 'usersrole-nx-sign-in',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    RouterLink,
    EmailSignInComponent,
  ],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  private readonly authenticationService = inject(AuthenticationService);
  private readonly matIconRegistry = inject(MatIconRegistry);
  private readonly domSanitizer = inject(DomSanitizer);
  private snackbarService = inject(SnackbarService);
  private readonly styleManagerService = inject(StyleManagerService);

  constructor() {
    this.matIconRegistry.addSvgIcon(
      'google-logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/google-icon.svg',
      ),
    );
    this.matIconRegistry.addSvgIcon(
      'github-logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/github-icon.svg',
      ),
    );
    this.styleManagerService.removeStyle('theme');
  }

  googleLogin() {
    this.authenticationService
      .googleAuth()
      .pipe(
        take(1),
        catchError((error) => this.handleError(error)),
      )
      .subscribe((response) => response);
  }

  githubLogin() {
    this.authenticationService
      .githubAuth()
      .pipe(
        take(1),
        catchError((error) => this.handleError(error)),
      )
      .subscribe((response) => response);
  }

  private handleError(error: { message: string }) {
    this.snackbarService.error(error.message, { variant: 'filled' }, true);
    return EMPTY;
  }
}
