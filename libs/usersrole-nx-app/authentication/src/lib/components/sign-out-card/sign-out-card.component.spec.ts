import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignOutCardComponent } from './sign-out-card.component';

describe('SignOutCardComponent', () => {
  let component: SignOutCardComponent;
  let fixture: ComponentFixture<SignOutCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignOutCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SignOutCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
