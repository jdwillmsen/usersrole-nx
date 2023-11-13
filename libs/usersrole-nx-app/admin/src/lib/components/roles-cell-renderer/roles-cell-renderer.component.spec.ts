import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RolesCellRendererComponent } from './roles-cell-renderer.component';

describe('RolesCellRendererComponent', () => {
  let component: RolesCellRendererComponent;
  let fixture: ComponentFixture<RolesCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolesCellRendererComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RolesCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
