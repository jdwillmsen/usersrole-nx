import { TestBed } from '@angular/core/testing';
import { AlertsComponent } from './alerts.component';

describe(AlertsComponent.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(AlertsComponent, {
      add: {
        imports: [],
        providers: [],
      },
    });
  });

  it('renders', () => {
    cy.mount(AlertsComponent);
  });
});
