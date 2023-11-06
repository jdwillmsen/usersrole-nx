import { TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';

describe(UserComponent.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(UserComponent, {
      add: {
        imports: [],
        providers: [],
      },
    });
  });

  it('renders', () => {
    cy.mount(UserComponent);
  });
});
