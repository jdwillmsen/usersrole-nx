import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateThemeComponent } from './create-theme.component';
import { FirestoreService } from '@usersrole-nx/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('CreateThemeComponent', () => {
  let component: CreateThemeComponent;
  let fixture: ComponentFixture<CreateThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateThemeComponent, MatSnackBarModule],
      providers: [
        {
          provide: FirestoreService,
          useValue: {},
        },
        {
          provide: AngularFireAuth,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
