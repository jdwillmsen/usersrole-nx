import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { mount } from 'cypress/angular';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FirestoreService } from '@usersrole-nx/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe(AppComponent.name, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      providers: [
        {
          provide: AngularFireAuth,
          useValue: {},
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
