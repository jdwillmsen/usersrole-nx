import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { from, Observable, switchMap, take } from 'rxjs';
import { Auth } from 'firebase/auth';
import { idToken } from 'rxfire/auth';
import { AUTH } from '../../firebase.tokens';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  private auth = inject<Auth>(AUTH);

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    // Wait for Firebase to finish restoring the session first: on page
    // reload idToken emits null before restoration completes, which sent
    // the request unauthenticated and produced 401s for signed-in users.
    return from(this.auth.authStateReady()).pipe(
      switchMap(() => idToken(this.auth)),
      take(1),
      switchMap((idToken) => {
        let clone = request.clone();
        if (idToken) {
          clone = clone.clone({
            headers: request.headers.set('Authorization', 'Bearer ' + idToken),
          });
        }
        return next.handle(clone);
      }),
    );
  }
}

export const AuthTokenHttpInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthTokenInterceptor,
  multi: true,
};
