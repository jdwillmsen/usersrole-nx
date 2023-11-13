import { TestBed } from '@angular/core/testing';
import { SignUpComponent } from './sign-up.component';
import { ENVIRONMENT } from '@usersrole-nx/core';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Route } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignInComponent } from '../sign-in/sign-in.component';
import { RouterTestingModule } from '@angular/router/testing';

describe(SignUpComponent.name, () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'POST',
        url: '/users',
      },
      '{"uid":"test-uid-1"}'
    ).as('getUsers');
    const routes: Route[] = [
      {
        path: 'sign-in',
        component: SignInComponent,
      },
    ];
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes(routes),
      ],
      providers: [
        {
          provide: ENVIRONMENT,
          useValue: {
            production: false,
            firebase: {},
            functionsBaseUrl: '',
          },
        },
      ],
    }).overrideComponent(SignUpComponent, {
      add: {
        imports: [HttpClientModule, MatSnackBarModule],
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
    cy.mount(SignUpComponent);
  });

  describe('Screen Sizes', () => {
    testScreenSize('XSmall', 400, 400);
    testScreenSize('Small', 800, 800);
    testScreenSize('Medium', 1200, 900);
    testScreenSize('Large', 1600, 1080);
    testScreenSize('XLarge', 2560, 1440);
  });
});

function testScreenSize(size: string, width: number, height: number) {
  describe(`${size}`, () => {
    beforeEach(() => {
      cy.viewport(width, height);
    });
    it(`should be setup properly on ${size} screen size`, () => {
      cy.mount(SignUpComponent);
      cy.getByCy('title').should('be.visible').and('contain.text', 'Sign Up');
      cy.getByCy('email-address-field')
        .should('be.visible')
        .and('contain.text', 'Enter your email');
      cy.getByCy('display-name-field')
        .should('be.visible')
        .and('contain.text', 'Enter your display name');
      cy.getByCy('password-field')
        .should('be.visible')
        .and('contain.text', 'Enter your password');
      cy.getByCy('password-visibility-button')
        .should('be.visible')
        .and('be.enabled');
      cy.getByCy('confirm-password-field')
        .should('be.visible')
        .and('contain.text', 'Enter your confirm password');
      cy.getByCy('confirm-password-visibility-button')
        .should('be.visible')
        .and('be.enabled');
      cy.getByCy('sign-up-button')
        .should('be.visible')
        .and('contain.text', 'Sign Up');
      cy.getByCy('sign-in')
        .should('be.visible')
        .and('contain.text', 'Already have an account?');
      cy.getByCy('sign-in-link')
        .should('be.visible')
        .and('contain.text', 'Sign in');
    });

    it('should show correct error messages', () => {
      cy.mount(SignUpComponent);
      cy.getByCy('sign-up-button').click();
      cy.getByCy('email-address-field')
        .should('contain.text', 'Email is required')
        .type('test')
        .should('contain.text', 'Enter a valid email');
      cy.getByCy('display-name-field').should(
        'contain.text',
        'Display name is required'
      );
      cy.getByCy('password-field')
        .should('contain.text', 'Password is required')
        .type('test')
        .should('contain.text', 'Password must be at least 6 characters long');
      cy.getByCy('confirm-password-field')
        .should('contain.text', 'Confirm password is required')
        .type('tes')
        .should('contain.text', 'Password must be at least 6 characters long');
      cy.getByCy('matching-password-error')
        .should('be.visible')
        .and('contain.text', 'Passwords must match');
    });

    it('should submit form correctly', () => {
      cy.mount(SignUpComponent);
      cy.getByCy('email-address-field').type('test-user-1@usersrole.com');
      cy.getByCy('display-name-field').type('Basic Test User #1');
      cy.getByCy('password-field').type('testPassword');
      cy.getByCy('confirm-password-field').type('testPassword');
      cy.getByCy('sign-up-button').click();
      cy.getByCy('snackbar-container')
        .should('be.visible')
        .and('contain.text', 'Sign up successful');
    });
  });
}
