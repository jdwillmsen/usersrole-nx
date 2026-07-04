import { Injectable, inject } from '@angular/core';
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
import {
  Auth,
  AuthCredential,
  fetchSignInMethodsForEmail,
  GithubAuthProvider,
  GoogleAuthProvider,
  linkWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';
import { authState } from 'rxfire/auth';
import { AUTH } from '../../firebase.tokens';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private auth = inject<Auth>(AUTH);
  private router = inject(Router);
  private snackbarService = inject(SnackbarService);

  private user: BehaviorSubject<Observable<User | null>> = new BehaviorSubject<
    Observable<User | null>
  >(of(null));
  user$ = this.user.asObservable().pipe(switchMap((user) => user));
  constructor() {
    this.user.next(authState(this.auth));
  }

  emailAuth(email: string, password: string): Observable<void> {
    return from(
      signInWithEmailAndPassword(this.auth, email, password)
        .then(() => {
          this.router.navigate(['home']).then(() => {
            this.snackbarService.success(
              SUCCESS_SIGN_IN_MESSAGE,
              {
                variant: 'filled',
                autoClose: true,
              },
              true,
            );
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
      signInWithPopup(this.auth, provider)
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
      signOut(this.auth)
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

  handleAuthLoginFailure(error: {
    email: string;
    credential: AuthCredential;
    code: string;
  }): void {
    if (
      error.email &&
      error.credential &&
      error.code === ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL
    ) {
      fetchSignInMethodsForEmail(this.auth, error.email)
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
          signInWithPopup(this.auth, linkedProvider)
            .then((result) => {
              if (result.user) {
                linkWithCredential(result.user, error.credential);
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
