import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { SnackbarService } from '../snackbar/snackbar.service';
import {
  ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL,
  ACCOUNT_PROVIDER_ERROR_MESSAGE,
  DEFAULT_ERROR_MESSAGE,
  INVALID_SIGN_IN_MESSAGE,
  SUCCESS_SIGN_IN_MESSAGE,
  SUCCESS_SIGN_OUT_MESSAGE,
  SUPPORTED_POPUP_SIGN_IN_METHODS,
  SupportedAuthProviders,
  SupportedPopupSignInMethods,
  USER_NOT_FOUND,
  WRONG_PASSWORD,
  WRONG_USERNAME,
} from '@usersrole-nx/shared';
import { handleError } from '../error-handler/error-handler.service';
import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private user: BehaviorSubject<Observable<firebase.User | null>> =
    new BehaviorSubject<Observable<firebase.User | null>>(of(null));
  user$ = this.user.asObservable().pipe(switchMap((user) => user));
  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private snackbarService: SnackbarService,
  ) {
    this.user.next(angularFireAuth.authState);
  }

  emailAuth(email: string, password: string): Observable<void> {
    return from(
      this.angularFireAuth
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          this.router.navigate(['home']).then(() => {
            this.snackbarService.success(SUCCESS_SIGN_IN_MESSAGE, {
              variant: 'filled',
              autoClose: true,
            });
          });
        })
        .catch((error) => {
          let errorMessage = DEFAULT_ERROR_MESSAGE;
          if (
            error.code === USER_NOT_FOUND ||
            error.code === WRONG_PASSWORD ||
            error.code === WRONG_USERNAME
          ) {
            errorMessage = INVALID_SIGN_IN_MESSAGE;
          }
          this.snackbarService.error(errorMessage, { variant: 'filled' }, true);
        }),
    );
  }

  googleAuth(): Observable<void> {
    return from(this.authLogin(new GoogleAuthProvider()));
  }

  githubAuth(): Observable<void> {
    return from(this.authLogin(new GithubAuthProvider()));
  }
  authLogin(provider: SupportedAuthProviders): Observable<void> {
    return from(
      this.angularFireAuth
        .signInWithPopup(provider)
        .then(() => {
          this.router.navigate(['home']).then(() => {
            this.snackbarService.success(SUCCESS_SIGN_IN_MESSAGE, {
              variant: 'filled',
              autoClose: true,
            });
          });
        })
        .catch((error) => {
          this.handleAuthLoginFailure(error);
        }),
    );
  }

  authLogout(): Observable<void> {
    return from(
      this.angularFireAuth
        .signOut()
        .then(() => {
          this.router.navigate(['sign-in']).then(() => {
            this.snackbarService.success(
              SUCCESS_SIGN_OUT_MESSAGE,
              {
                variant: 'filled',
                autoClose: true,
              },
              true,
            );
          });
        })
        .catch((error) => {
          handleError(error, this.snackbarService);
        }),
    );
  }

  getProvider(providerId: string): SupportedAuthProviders {
    switch (providerId) {
      case GoogleAuthProvider.PROVIDER_ID:
        return new GoogleAuthProvider();
      case GithubAuthProvider.PROVIDER_ID:
        return new GithubAuthProvider();
      default:
        throw new Error(`No provider implemented for ${providerId}`);
    }
  }

  handleAuthLoginFailure(error: any): void {
    if (
      error.email &&
      error.credential &&
      error.code === ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL
    ) {
      this.angularFireAuth
        .fetchSignInMethodsForEmail(error.email)
        .then((providers) => {
          console.error(providers);
          const firstPopupProviderMethod = providers.find((p) =>
            SUPPORTED_POPUP_SIGN_IN_METHODS.includes(
              <SupportedPopupSignInMethods>p,
            ),
          );
          if (!firstPopupProviderMethod) {
            throw new Error(ACCOUNT_PROVIDER_ERROR_MESSAGE);
          }
          const linkedProvider = this.getProvider(firstPopupProviderMethod);
          linkedProvider.setCustomParameters({ login_hint: error.email });
          this.angularFireAuth
            .signInWithPopup(linkedProvider)
            .then((result) => {
              if (result.user) {
                result.user.linkWithCredential(error.credential);
                // this.router.navigate(['home']);
              }
            })
            .catch((error) => handleError(error, this.snackbarService));
        })
        .catch((error) => handleError(error, this.snackbarService));
    } else {
      handleError(error, this.snackbarService);
    }
  }
}
