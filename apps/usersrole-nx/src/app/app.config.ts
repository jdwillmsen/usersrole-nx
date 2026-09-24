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
  withXhr,
} from '@angular/common/http';
import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
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
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const functions = getFunctions(firebaseApp);

// The SDK only accepts an emulator connection before its first request, so
// this runs once at load rather than inside the DI factories. The ports match
// the emulators block in firebase.json.
if (environment.useEmulators) {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
  connectFirestoreEmulator(firestore, '127.0.0.1', 8080);
  connectFunctionsEmulator(functions, '127.0.0.1', 5001);
}

export const appConfig: ApplicationConfig = {
  providers: [
    AuthTokenHttpInterceptorProvider,
    GlobalHttpErrorHandlerInterceptorProvider,
    // The auth-token and error-handler interceptors are HTTP_INTERCEPTORS DI
    // providers; without this opt-in the standalone HttpClient ignores them
    // and every API request goes out unauthenticated.
    provideHttpClient(withXhr(), withInterceptorsFromDi()),
    provideAnimations(),
    importProvidersFrom(MatSnackBarModule),
    { provide: FIREBASE_APP, useValue: firebaseApp },
    { provide: AUTH, useValue: auth },
    { provide: FIRESTORE, useValue: firestore },
    { provide: FUNCTIONS, useValue: functions },
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
