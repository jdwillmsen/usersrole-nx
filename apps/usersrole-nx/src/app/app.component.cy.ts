import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { mount } from 'cypress/angular';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ENVIRONMENT, FirestoreService } from '@usersrole-nx/core';
import { AUTH } from '@usersrole-nx/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SwUpdate } from '@angular/service-worker';
import { EMPTY } from 'rxjs';

describe(AppComponent.name, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      providers: [
        {
          provide: AUTH,
          useValue: {
            onAuthStateChanged: (next: (user: null) => void) => {
              next(null);
              return () => undefined;
            },
            onIdTokenChanged: (next: (user: null) => void) => {
              next(null);
              return () => undefined;
            },
            currentUser: null,
          },
        },
        {
          provide: ENVIRONMENT,
          useValue: {
            production: false,
            firebase: {},
            functionsBaseUrl: '',
          },
        },
        {
          provide: SwUpdate,
          useValue: { isEnabled: false, versionUpdates: EMPTY },
        },
      ],
    }).overrideComponent(AppComponent, {
      add: {
        imports: [HttpClientModule, MatSnackBarModule],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {},
          },
          {
            provide: FirestoreService,
            useValue: {},
          },
        ],
      },
    });
  });

  it('renders', () => {
    mount(AppComponent);
  });
});
