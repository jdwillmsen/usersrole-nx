import { TestBed } from '@angular/core/testing';
import { MainComponent } from './main.component';
import { ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {
  AuthenticationService,
  ENVIRONMENT,
  FirestoreService,
} from '@usersrole-nx/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AUTH } from '@usersrole-nx/core';
import { of } from 'rxjs';

describe(MainComponent.name, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      providers: [
        {
          provide: AUTH,
          useValue: {
            onAuthStateChanged: (next: (user: null) => void) => {
              next(null);
              return () => undefined;
            },
            onIdTokenChanged: (next: (user: null) => void) => {
              next(null);
              return () => undefined;
            },
            currentUser: null,
          },
        },
        {
          provide: ENVIRONMENT,
          useValue: {
            production: false,
            firebase: {},
            functionsBaseUrl: '',
          },
        },
        {
          provide: AuthenticationService,
          useValue: {
            user$: of(() => true),
          },
        },
      ],
    }).overrideComponent(MainComponent, {
      add: {
        imports: [HttpClientModule, MatSnackBarModule],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {},
          },
          {
            provide: FirestoreService,
            useValue: {
              getUsersDoc: () => new Promise((resolve) => resolve),
            },
          },
        ],
      },
    });
  });

  it('renders', () => {
    cy.mount(MainComponent);
  });

  it('should setup properly on XSmall screens', () => {
    cy.viewport(400, 400);
    cy.mount(MainComponent);
    cy.getByCy('navbar-header').should('be.visible');
    cy.getByCy('sidenav-content').should('be.visible');
    cy.getByCy('sidenav').should('not.be.visible');
    cy.getByCy('navbar-button').click();
    cy.getByCy('sidenav').should('be.visible');
    cy.getByCy('navbar-button').click();
    cy.getByCy('sidenav').should('not.be.visible');
    cy.getByCy('navbar-button').click();
    cy.getByCy('sidenav').should('be.visible');
    cy.get('.mat-drawer-backdrop').click();
    cy.getByCy('sidenav').should('not.be.visible');
  });

  it('should setup properly on Small screens', () => {
    cy.viewport(800, 800);
    cy.mount(MainComponent);
    setupProperly();
  });

  it('should setup properly on Medium screens', () => {
    cy.viewport(1200, 900);
    cy.mount(MainComponent);
    setupProperly();
  });

  it('should setup properly on Large screens', () => {
    cy.viewport(1600, 1080);
    cy.mount(MainComponent);
    setupProperly();
  });

  it('should setup properly on XLarge screens', () => {
    cy.viewport(2560, 1440);
    cy.mount(MainComponent);
    setupProperly();
  });
});

const setupProperly = () => {
  cy.getByCy('navbar-header').should('be.visible');
  cy.getByCy('sidenav-content').should('be.visible');
  cy.getByCy('sidenav').should('be.visible');
  cy.getByCy('navigation-title').should('not.exist');
  cy.getByCy('expand-toggle-button').click();
  cy.getByCy('navigation-title').should('exist');
};
