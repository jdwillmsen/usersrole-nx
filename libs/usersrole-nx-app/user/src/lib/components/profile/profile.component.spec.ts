import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { AUTH } from '@usersrole-nx/core';
import { ENVIRONMENT } from '@usersrole-nx/core';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProfileComponent,
        HttpClientModule,
        MatSnackBarModule,
        NoopAnimationsModule,
      ],
      providers: [
        {
          provide: ENVIRONMENT,
          useValue: {
            production: false,
            firebase: {},
            functionsBaseUrl: '',
          },
        },
      ],
    })
      .overrideComponent(ProfileComponent, {
        add: {
          providers: [
            {
              provide: AUTH,
              useValue: {
                onAuthStateChanged: (next: (user: unknown) => void) => {
                  next({ uid: 'test-uid' });
                  return () => undefined;
                },
                onIdTokenChanged: (next: (user: unknown) => void) => {
                  next({ uid: 'test-uid' });
                  return () => undefined;
                },
                currentUser: null,
              },
            },
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
