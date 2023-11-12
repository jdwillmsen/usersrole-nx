import { TestBed } from '@angular/core/testing';
import { EmailSignInComponent } from './email-sign-in.component';
import { AuthenticationService } from '@usersrole-nx/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Route } from '@angular/router';
import { Component } from '@angular/core';

describe(EmailSignInComponent.name, () => {
  beforeEach(() => {
    @Component({
      selector: 'usersrole-nx-test-home',
      standalone: true,
      template: '<div>Test Home Component Works!</div>',
    })
    class TestHomeComponent {}
    const routes: Route[] = [
      {
        path: 'home',
        component: TestHomeComponent,
      },
    ];
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes(routes),
      ],
    }).overrideComponent(EmailSignInComponent, {
      add: {
        imports: [MatSnackBarModule],
        providers: [
          AuthenticationService,
          {
            provide: AngularFireAuth,
            useValue: {
              signInWithEmailAndPassword: () => {
                return new Promise((resolve) => resolve('success'));
              },
            },
          },
        ],
      },
    });
  });

  it('renders', () => {
    cy.mount(EmailSignInComponent);
  });

  it('should be setup properly', () => {
    cy.mount(EmailSignInComponent);
    cy.getByCy('email-address-field')
      .should('be.visible')
      .and('contain.text', 'Enter your email');
    cy.getByCy('password-field')
      .should('be.visible')
      .and('contain.text', 'Enter your password');
    cy.getByCy('password-visibility-button')
      .should('be.visible')
      .and('be.enabled')
      .click();
    cy.getByCy('sign-in-button')
      .should('be.visible')
      .and('contain.text', 'Sign In')
      .and('be.enabled');
  });

  it('should show error fields for improper input', () => {
    cy.mount(EmailSignInComponent);
    cy.getByCy('email-address-field').find('input').click().blur();
    cy.getByCy('email-address-field')
      .should('contain.text', 'Email is required')
      .type('test')
      .should('contain.text', 'Enter a valid email');
    cy.getByCy('password-field').find('input').click().blur();
    cy.getByCy('password-field')
      .should('contain.text', 'Password is required')
      .type('test')
      .should('contain.text', 'Password must be at least 6 characters long');
  });

  it('should submit form successfully with correct input', () => {
    cy.mount(EmailSignInComponent);
    cy.getByCy('email-address-field').type('test-user-1@usersrole.com');
    cy.getByCy('password-field').type('testPassword');
    cy.getByCy('sign-in-button').click();
    cy.getByCy('snackbar-container')
      .should('be.visible')
      .and('contain.text', 'Sign in successful');
  });
});
