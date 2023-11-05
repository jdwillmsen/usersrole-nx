import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SnackbarsComponent } from './snackbars.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SnackbarsComponent', () => {
  let component: SnackbarsComponent;
  let fixture: ComponentFixture<SnackbarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnackbarsComponent, MatSnackBarModule, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SnackbarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
