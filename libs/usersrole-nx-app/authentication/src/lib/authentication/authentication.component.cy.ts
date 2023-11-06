import { TestBed } from '@angular/core/testing';
import { AuthenticationComponent } from './authentication.component';

describe(AuthenticationComponent.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(AuthenticationComponent, {
      add: {
        imports: [],
        providers: [],
      },
    });
  });

  it('renders', () => {
    cy.mount(AuthenticationComponent);
  });
});
