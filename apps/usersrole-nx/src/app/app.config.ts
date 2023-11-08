import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideHttpClient(),
    provideAnimations(),
    importProvidersFrom(
      MatSnackBarModule,
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'users-role-nx',
          appId: '1:267012633634:web:b1a938b1ab87883bd4c67b',
          storageBucket: 'users-role-nx.appspot.com',
          apiKey: 'AIzaSyBEaRY-pKlhpky-y20bKWsbuhFbjTv6WiE',
          authDomain: 'users-role-nx.firebaseapp.com',
          messagingSenderId: '267012633634',
          measurementId: 'G-33YM05QL2M',
        })
      ),
      provideAuth(() => getAuth()),
      provideFunctions(() => getFunctions()),
      provideFirestore(() => getFirestore())
    ),
  ],
};
