import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';
import { HttpClientModule } from '@angular/common/http';
import { ENVIRONMENT, FirestoreService } from '@usersrole-nx/core';
import { AUTH } from '@usersrole-nx/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';
import { EMPTY } from 'rxjs';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        RouterTestingModule,
        HttpClientModule,
        MatSnackBarModule,
      ],
      providers: [
        {
          provide: FirestoreService,
          useValue: {},
        },
        {
          provide: SwUpdate,
          useValue: { isEnabled: false, versionUpdates: EMPTY },
        },
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
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
