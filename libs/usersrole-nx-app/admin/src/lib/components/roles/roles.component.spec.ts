import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RolesComponent } from './roles.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ENVIRONMENT } from '@usersrole-nx/core';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('RolesComponent', () => {
  let component: RolesComponent;
  let fixture: ComponentFixture<RolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RolesComponent,
        NoopAnimationsModule,
        HttpClientModule,
        MatSnackBarModule,
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
    }).compileComponents();

    fixture = TestBed.createComponent(RolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
