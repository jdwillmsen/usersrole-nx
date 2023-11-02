import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewPalettesComponent } from './view-palettes.component';

describe('ViewPalettesComponent', () => {
  let component: ViewPalettesComponent;
  let fixture: ComponentFixture<ViewPalettesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPalettesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewPalettesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
