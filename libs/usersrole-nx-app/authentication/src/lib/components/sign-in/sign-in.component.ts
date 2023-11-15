import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  standalone: true,
  imports: [
    CommonModule,
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
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly matIconRegistry: MatIconRegistry,
    private readonly domSanitizer: DomSanitizer,
    private snackbarService: SnackbarService,
    private readonly styleManagerService: StyleManagerService
  ) {
    this.matIconRegistry.addSvgIcon(
      'google-logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/google-icon.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'github-logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/github-icon.svg'
      )
    );
    this.styleManagerService.removeStyle('theme');
  }

  googleLogin() {
    this.authenticationService
      .googleAuth()
      .pipe(
        take(1),
        catchError((error) => this.handleError(error))
      )
      .subscribe((response) => response);
  }

  githubLogin() {
    this.authenticationService
      .githubAuth()
      .pipe(
        take(1),
        catchError((error) => this.handleError(error))
      )
      .subscribe((response) => response);
  }

  private handleError(error: any) {
    this.snackbarService.error(error.message, { variant: 'filled' }, true);
    return EMPTY;
  }
}
