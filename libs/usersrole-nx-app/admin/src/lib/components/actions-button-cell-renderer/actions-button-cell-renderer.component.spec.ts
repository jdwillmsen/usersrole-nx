import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActionsButtonCellRendererComponent } from './actions-button-cell-renderer.component';
import { ENVIRONMENT } from '@usersrole-nx/core';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('ActionsButtonCellRendererComponent', () => {
  let component: ActionsButtonCellRendererComponent;
  let fixture: ComponentFixture<ActionsButtonCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ActionsButtonCellRendererComponent,
        HttpClientModule,
        MatSnackBarModule,
        MatDialogModule,
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

    fixture = TestBed.createComponent(ActionsButtonCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
