import {
  ApplicationConfig,
  ErrorHandler,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFunctions } from 'firebase/functions';
import { getFirestore } from 'firebase/firestore';
import {
  AUTH,
  AuthTokenHttpInterceptorProvider,
  ENVIRONMENT,
  ErrorHandlerService,
  FIREBASE_APP,
  FIRESTORE,
  FUNCTIONS,
  GlobalHttpErrorHandlerInterceptorProvider,
} from '@usersrole-nx/core';
import { environment } from '../environments/environment';
import { provideServiceWorker } from '@angular/service-worker';

const firebaseApp = initializeApp(environment.firebase);

export const appConfig: ApplicationConfig = {
  providers: [
    AuthTokenHttpInterceptorProvider,
    GlobalHttpErrorHandlerInterceptorProvider,
    // The auth-token and error-handler interceptors are HTTP_INTERCEPTORS DI
    // providers; without this opt-in the standalone HttpClient ignores them
    // and every API request goes out unauthenticated.
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    importProvidersFrom(MatSnackBarModule),
    { provide: FIREBASE_APP, useValue: firebaseApp },
    { provide: AUTH, useFactory: () => getAuth(firebaseApp) },
    { provide: FIRESTORE, useFactory: () => getFirestore(firebaseApp) },
    { provide: FUNCTIONS, useFactory: () => getFunctions(firebaseApp) },
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    {
      provide: ENVIRONMENT,
      useValue: environment,
    },
    {
      provide: ErrorHandler,
      useClass: ErrorHandlerService,
    },
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};
