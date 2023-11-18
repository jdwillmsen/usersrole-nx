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
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';
import {
  AuthTokenHttpInterceptorProvider,
  ENVIRONMENT,
  ErrorHandlerService,
  GlobalHttpErrorHandlerInterceptorProvider,
} from '@usersrole-nx/core';
import { environment } from '../environments/environment';
import { provideServiceWorker } from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
  providers: [
    AuthTokenHttpInterceptorProvider,
    GlobalHttpErrorHandlerInterceptorProvider,
    provideHttpClient(),
    provideAnimations(),
    importProvidersFrom(
      HttpClientModule,
      MatSnackBarModule,
      provideAuth(() => getAuth()),
      provideFunctions(() => getFunctions()),
      provideFirestore(() => getFirestore()),
      AngularFireModule.initializeApp(environment.firebase),
      provideFirebaseApp(() => initializeApp(environment.firebase)),
    ),
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    {
      provide: ENVIRONMENT,
      useValue: environment,
    },
    {
      provide: ErrorHandler,
      useClass: ErrorHandlerService,
    },
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};
