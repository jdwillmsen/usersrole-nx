import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignOutCardComponent } from './sign-out-card.component';
import { AUTH } from '@usersrole-nx/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('SignOutCardComponent', () => {
  let component: SignOutCardComponent;
  let fixture: ComponentFixture<SignOutCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignOutCardComponent, MatSnackBarModule],
      providers: [
        {
          provide: AUTH,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignOutCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
