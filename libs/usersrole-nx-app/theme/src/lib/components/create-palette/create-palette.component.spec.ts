import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatePaletteComponent } from './create-palette.component';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { PaletteFormGroup } from '../../models/palette-form-group';

describe('CreatePaletteComponent', () => {
  let component: CreatePaletteComponent;
  let fixture: ComponentFixture<CreatePaletteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePaletteComponent],
      providers: [
        {
          provide: FormGroupDirective,
          useValue: {
            control: new FormGroup({
              primaryPalette: new FormGroup(
                new PaletteFormGroup().paletteFormGroup,
              ),
            }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePaletteComponent);
    component = fixture.componentInstance;
    component.formGroupName = 'primaryPalette';
    component.paletteType = 'primary';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
