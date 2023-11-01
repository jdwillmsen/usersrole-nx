import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeTileComponent } from './home-tile.component';
import { ActivatedRoute } from '@angular/router';

describe('HomeTileComponent', () => {
  let component: HomeTileComponent;
  let fixture: ComponentFixture<HomeTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeTileComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
