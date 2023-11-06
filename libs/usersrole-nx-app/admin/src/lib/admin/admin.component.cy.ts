import { TestBed } from '@angular/core/testing';
import { AdminComponent } from './admin.component';

describe(AdminComponent.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(AdminComponent, {
      add: {
        imports: [],
        providers: [],
      },
    });
  });

  it('renders', () => {
    cy.mount(AdminComponent);
  });
});
