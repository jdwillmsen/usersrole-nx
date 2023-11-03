import { TestBed } from '@angular/core/testing';
import { AlertComponent } from './alert.component';

describe(AlertComponent.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(AlertComponent, {
      add: {
        imports: [],
        providers: [],
      },
    });
  });

  it('renders', () => {
    cy.mount(AlertComponent);
  });
});
