import { TestBed } from '@angular/core/testing';
import { RolesComponent } from './roles.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ENVIRONMENT } from '@usersrole-nx/core';

describe(RolesComponent.name, () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        url: '/users',
      },
      {
        fixture: 'users.json',
      }
    ).as('getUsers');
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
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
    }).overrideComponent(RolesComponent, {
      add: {
        imports: [HttpClientModule, MatSnackBarModule],
        providers: [],
      },
    });
  });

  it('renders', () => {
    cy.mount(RolesComponent);
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
      cy.mount(RolesComponent);
      cy.getByCy('title').should('be.visible').and('have.text', 'Roles');
      cy.getByCy('select-user-field')
        .should('be.visible')
        .and('have.text', 'Select User');
      cy.getByCy('select-roles-field')
        .should('be.visible')
        .and('have.text', 'Roles');
      cy.getByCy('assign-roles-button')
        .should('be.visible')
        .and('contain.text', 'Assign Roles')
        .and('be.disabled');
      cy.getByCy('reset-button')
        .should('be.visible')
        .and('contain.text', 'Reset')
        .and('be.enabled');
    });

    it('should have error messages after touched form', () => {
      cy.mount(RolesComponent);
      cy.getByCy('select-user-field').click();
      cy.getByCy('title').click();
      cy.getByCy('select-roles-field').click();
      cy.get('.cdk-overlay-backdrop').click({ force: true });
      cy.getByCy('assign-roles-button').should('be.disabled');
      cy.getByCy('select-user-field').contains(
        'Please select a user from the list'
      );
      cy.getByCy('select-roles-field').contains(
        'At least one role must be selected'
      );
    });

    it('should populate roles field when user is selected', () => {
      cy.mount(RolesComponent);
      cy.getByCy('select-user-field')
        .type('Basic Test User #1{enter}')
        .get('input')
        .should('contain.value', 'Basic Test User #1 (test-uid-1)');
      cy.getByCy('select-roles-field').should('contain.text', 'User');
      cy.getByCy('matching-roles-error')
        .should('be.visible')
        .and('contain.text', 'The user already has these roles');
      cy.getByCy('assign-roles-button').should('be.disabled');
    });

    it('should assign roles correctly', () => {
      cy.intercept(
        {
          method: 'PATCH',
          url: '/users/roles/**',
        },
        ''
      ).as('assignRoles');
      cy.mount(RolesComponent);
      cy.getByCy('select-user-field').type('Basic Test User #1{enter}');
      cy.getByCy('select-roles-field').click();
      cy.get('[data-cy="read-role-option"] > .mat-pseudo-checkbox').click();
      cy.get('.cdk-overlay-backdrop').click({ force: true });
      cy.getByCy('select-roles-field').should('contain.text', 'User, Read');
      cy.getByCy('assign-roles-button').should('be.enabled').click();
      cy.get('.snackbar-container')
        .should('be.visible')
        .and('contain.text', 'Roles assigned successfully');
      cy.getByCy('reset-button').click();
      cy.getByCy('assign-roles-button').should('be.disabled');
      cy.getByCy('select-user-field').get('input').should('have.value', '');
      cy.getByCy('select-roles-field').get('input').should('have.value', '');
      cy.getByCy('select-user-field').type('All Test User #1{enter}');
      cy.getByCy('select-roles-field')
        .should('contain.text', 'Admin, Manager, User, Read')
        .click();
      cy.get('[data-cy="admin-role-option"] > .mat-pseudo-checkbox').click();
      cy.get('[data-cy="manager-role-option"] > .mat-pseudo-checkbox').click();
      cy.get('[data-cy="read-role-option"] > .mat-pseudo-checkbox').click();
      cy.get('.cdk-overlay-backdrop').click({ force: true });
      cy.getByCy('assign-roles-button').should('be.enabled').click();
      cy.get('.snackbar-container')
        .should('be.visible')
        .and('contain.text', 'Roles assigned successfully');
    });
  });
}
