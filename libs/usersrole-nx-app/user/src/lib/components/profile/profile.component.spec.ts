import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ENVIRONMENT } from '@usersrole-nx/core';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';
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
              provide: AngularFireAuth,
              useValue: {
                user: of(() => true),
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
