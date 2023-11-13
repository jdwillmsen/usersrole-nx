import { TestBed } from '@angular/core/testing';
import { SignOutCardComponent } from './sign-out-card.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignInComponent } from '../sign-in/sign-in.component';
import { Route } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe(SignOutCardComponent.name, () => {
  beforeEach(() => {
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
          provide: AngularFireAuth,
          useValue: {
            signOut: () => new Promise((resolve) => resolve(true)),
          },
        },
      ],
    }).overrideComponent(SignOutCardComponent, {
      add: {
        imports: [MatSnackBarModule],
      },
    });
  });

  it('renders', () => {
    cy.mount(SignOutCardComponent);
  });

  it('should be setup properly', () => {
    cy.mount(SignOutCardComponent);
    cy.getByCy('profile-card-button').should('be.visible').click();
    cy.getByCy('user-button-icon').should('be.visible');
    cy.getByCy('user-icon').should('be.visible');
    cy.getByCy('display-name').should('not.have.value');
    cy.getByCy('email').should('not.have.value');
    cy.getByCy('sign-out').should('be.visible');
    cy.get('.cdk-overlay-backdrop').click({ force: true });
  });

  it('should be able to sign out', () => {
    cy.mount(SignOutCardComponent);
    cy.getByCy('profile-card-button').click();
    cy.getByCy('sign-out').click();
    cy.getByCy('snackbar-container')
      .should('be.visible')
      .and('contain.text', 'Sign out successful');
  });

  it('should be setup properly with user passed in', () => {
    cy.mount(SignOutCardComponent, {
      componentProperties: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        user: {
          displayName: 'Tester',
          email: 'test@usersrole-nx.com',
          photoURL:
            'https://img.freepik.com/free-photo/red-white-cat-i-white-studio_155003-13189.jpg?size=626&ext=jpg&ga=GA1.1.1880011253.1699747200&semt=sph',
        },
      },
    });
    cy.getByCy('profile-card-button').should('be.visible').click();
    cy.getByCy('user-button-icon').should('be.visible');
    cy.getByCy('user-icon').should('be.visible');
    cy.getByCy('display-name').should('contain.text', 'Tester');
    cy.getByCy('email').should('contain.text', 'test@usersrole-nx.com');
    cy.getByCy('sign-out').should('be.visible');
  });
});
