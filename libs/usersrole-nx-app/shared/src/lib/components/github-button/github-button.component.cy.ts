import { TestBed } from '@angular/core/testing';
import { GithubButtonComponent } from './github-button.component';
import { HttpClientModule } from '@angular/common/http';

describe(GithubButtonComponent.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(GithubButtonComponent, {
      add: {
        imports: [HttpClientModule],
        providers: [],
      },
    });
  });

  it('renders', () => {
    cy.mount(GithubButtonComponent);
  });

  it('should be setup properly with standard properties', () => {
    cy.mount(GithubButtonComponent, {
      componentProperties: {
        githubLink: 'https://github.com/jdwillmsen/usersrole-nx',
      },
    });
    testSetupProperly();
  });

  it('should be setup properly with default properties', () => {
    cy.mount(GithubButtonComponent);
    testSetupProperly();
  });
});

function testSetupProperly() {
  cy.getByCy('github-button-link').should('be.visible');
  cy.getByCy('github-button-button').should('be.visible');
  cy.getByCy('github-button-icon').should('be.visible');
  cy.getByCy('github-button-link').should('be.visible').trigger('mouseenter');
  cy.get('[role="tooltip"]').should('contain.text', 'GitHub');
  cy.getByCy('github-button-link').trigger('mouseleave');
}
