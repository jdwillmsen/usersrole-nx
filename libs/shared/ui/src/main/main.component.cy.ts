import { TestBed } from '@angular/core/testing';
import { MainComponent } from './main.component';

describe(MainComponent.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(MainComponent, {
      add: {
        imports: [],
        providers: [],
      },
    });
  });

  it('renders', () => {
    cy.mount(MainComponent);
  });
});
