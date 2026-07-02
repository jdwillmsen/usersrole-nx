import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainComponent } from './main.component';
import { ActivatedRoute } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ENVIRONMENT, FirestoreService } from '@usersrole-nx/core';
import { AUTH } from '@usersrole-nx/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MainComponent,
        NoopAnimationsModule,
        HttpClientModule,
        MatSnackBarModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {},
        },
        {
          provide: FirestoreService,
          useValue: {},
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

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
