import { TestBed } from '@angular/core/testing';
import { ActionsButtonCellRendererComponent } from './actions-button-cell-renderer.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { ENVIRONMENT } from '@usersrole-nx/core';

describe(ActionsButtonCellRendererComponent.name, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
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
    }).overrideComponent(ActionsButtonCellRendererComponent, {
      add: {
        imports: [MatSnackBarModule, HttpClientModule, MatDialogModule],
      },
    });
  });

  it('renders', () => {
    cy.mount(ActionsButtonCellRendererComponent);
  });

  it('should have buttons setup and displayed correctly', () => {
    cy.mount(ActionsButtonCellRendererComponent);
    cy.getByCy('view-button')
      .should('be.visible')
      .and('be.enabled')
      .trigger('mouseenter');
    cy.get('.mdc-tooltip__surface')
      .should('be.visible')
      .and('contain.text', 'View User');
    cy.getByCy('view-button').trigger('mouseleave');

    cy.getByCy('edit-button')
      .should('be.visible')
      .and('be.enabled')
      .trigger('mouseenter');
    cy.get('.mdc-tooltip__surface')
      .should('be.visible')
      .and('contain.text', 'Edit User');
    cy.getByCy('edit-button').trigger('mouseleave');

    cy.getByCy('delete-button')
      .should('be.visible')
      .and('be.enabled')
      .trigger('mouseenter');
    cy.get('.mdc-tooltip__surface')
      .should('be.visible')
      .and('contain.text', 'Delete User');
    cy.getByCy('delete-button').trigger('mouseleave');
  });
});
