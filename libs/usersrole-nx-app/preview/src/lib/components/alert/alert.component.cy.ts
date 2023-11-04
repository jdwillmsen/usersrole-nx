import { TestBed } from '@angular/core/testing';
import { AlertComponent } from './alert.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe(AlertComponent.name, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
    }).overrideComponent(AlertComponent, {
      add: {
        imports: [],
        providers: [],
      },
    });
  });

  it('renders', () => {
    cy.mount(AlertComponent);
  });

  it('should be setup properly with standard properties', () => {
    cy.mount(AlertComponent, {
      componentProperties: {
        alerts: [
          {
            id: 'default-alert',
            message: 'Test message',
            icon: 'bug_report',
            closeButton: true,
          },
        ],
      },
    });
    cy.getByCy('alert').should('be.visible');
    cy.getByCy('message')
      .should('be.visible')
      .and('contain.text', 'Test message');
    cy.getByCy('icon').should('be.visible');
    cy.getByCy('close-button').should('be.visible');
  });

  it('should be setup properly multiple alert properties', () => {
    cy.mount(AlertComponent, {
      componentProperties: {
        alerts: [
          {
            id: 'default-alert',
            message: 'Test message 1',
            icon: 'bug_report',
            closeButton: true,
          },
          {
            id: 'default-alert',
            message: 'Test message 2',
            icon: 'bug_report',
            closeButton: true,
          },
          {
            id: 'default-alert',
            message: 'Test message 3',
            icon: 'bug_report',
            closeButton: true,
          },
        ],
      },
    });
    cy.getByCy('icon').should('have.length', '3').and('be.visible');
    cy.getByCy('message').should('have.length', '3').and('be.visible');
    cy.getByCy('close-button').should('have.length', '3').and('be.visible');
  });

  it('should be setup properly with no icon and close properties', () => {
    cy.mount(AlertComponent, {
      componentProperties: {
        alerts: [
          {
            id: 'default-alert',
            message: 'Test message',
          },
        ],
      },
    });
    cy.getByCy('alert').should('be.visible');
    cy.getByCy('message').should('be.visible');
    cy.getByCy('icon').should('not.be.visible');
    cy.getByCy('close-button').should('not.be.visible');
  });

  it('should be able to close alert', () => {
    cy.mount(AlertComponent, {
      componentProperties: {
        alerts: [
          {
            id: 'default-alert',
            message: 'Test message',
            icon: 'bug_report',
            closeButton: true,
          },
        ],
      },
    });
    cy.getByCy('close-button').click();
    cy.getByCy('alert').should('not.exist');
  });
});
