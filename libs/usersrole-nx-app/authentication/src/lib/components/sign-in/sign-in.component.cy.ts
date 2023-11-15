import { TestBed } from '@angular/core/testing';
import { SignInComponent } from './sign-in.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@usersrole-nx/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe(SignInComponent.name, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
    }).overrideComponent(SignInComponent, {
      add: {
        imports: [MatSnackBarModule, HttpClientModule],
        providers: [
          AuthenticationService,
          {
            provide: AngularFireAuth,
            useValue: {},
          },
          {
            provide: ActivatedRoute,
            useValue: {},
          },
        ],
      },
    });
  });

  it('renders', () => {
    cy.mount(SignInComponent);
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
  it(`should be setup properly on ${size} screen size`, () => {
    cy.viewport(width, height);
    cy.mount(SignInComponent);
    cy.getByCy('title').should('be.visible').and('contain.text', 'Sign In');
    cy.getByCy('email-sign-in').should('be.visible');
    cy.getByCy('google-sign-in-button')
      .should('be.visible')
      .and('contain.text', 'Sign in with Google');
    cy.getByCy('github-sign-in-button')
      .should('be.visible')
      .and('contain.text', 'Sign in with GitHub');
    cy.getByCy('new-user')
      .should('be.visible')
      .and('contain.text', 'New User?');
    cy.getByCy('sign-up-link')
      .should('be.visible')
      .and('contain.text', 'Sign up');
  });
}
