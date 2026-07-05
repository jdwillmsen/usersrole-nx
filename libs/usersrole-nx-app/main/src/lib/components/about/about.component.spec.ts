import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';
import { VersionInfo } from '../../generated/version-info';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // version-info.ts is regenerated with a real commit whenever the app build
  // target runs, so tests must not assume the committed 'dev' placeholder.
  function setInfo(overrides: Partial<VersionInfo>) {
    (component as { info: VersionInfo }).info = {
      ...component.info,
      ...overrides,
    };
    fixture.detectChanges();
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders all four info cards', () => {
    const cards = [
      'build-card',
      'libraries-card',
      'runtime-card',
      'project-card',
    ];
    for (const card of cards) {
      expect(
        fixture.nativeElement.querySelector(`[data-cy="${card}"]`),
      ).toBeTruthy();
    }
  });

  it('links the commit to the repository for real builds', () => {
    setInfo({ commit: 'abc1234' });
    expect(component.commitUrl).toBe(
      'https://github.com/jdwillmsen/usersrole-nx/commit/abc1234',
    );
    expect(
      fixture.nativeElement.querySelector('[data-cy="commit-link"]'),
    ).toBeTruthy();
  });

  it('hides the commit link for dev builds', () => {
    setInfo({ commit: 'dev' });
    expect(component.commitUrl).toBeNull();
    expect(
      fixture.nativeElement.querySelector('[data-cy="commit-link"]'),
    ).toBeNull();
  });
});
