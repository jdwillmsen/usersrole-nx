import { TestBed } from '@angular/core/testing';
import { ForbiddenComponent } from './forbidden.component';
import { ActivatedRoute } from '@angular/router';

describe(ForbiddenComponent.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(ForbiddenComponent, {
      add: {
        imports: [],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {},
          },
        ],
      },
    });
  });

  it('renders', () => {
    cy.mount(ForbiddenComponent);
  });

  it('should be setup properly with standard properties', () => {
    cy.mount(ForbiddenComponent, {
      componentProperties: {
        redirectLink: '/test',
        redirectIcon: 'bug_report',
        redirectText: 'Test',
      },
    });
    testSetupProperly('Test');
  });

  it('should be setup properly with default properties', () => {
    cy.mount(ForbiddenComponent);
    testSetupProperly('Home');
  });
});

function testSetupProperly(redirectText: string) {
  cy.getByCy('number').should('be.visible').and('have.text', '403');
  cy.getByCy('title').should('be.visible').and('have.text', 'Forbidden');
  cy.getByCy('message')
    .should('be.visible')
    .and('contain.text', 'You do not have permission to access this resource.');
  cy.getByCy('redirect-button')
    .should('be.visible')
    .and('contain.text', redirectText)
    .and('be.enabled');
  cy.getByCy('redirect-icon').should('be.visible');
}
