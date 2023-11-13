import { TestBed } from '@angular/core/testing';
import { ThemeSelectorComponent } from './theme-selector.component';
import { FirestoreService } from '@usersrole-nx/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe(ThemeSelectorComponent.name, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      providers: [
        {
          provide: AngularFireAuth,
          useValue: {},
        },
      ],
    }).overrideComponent(ThemeSelectorComponent, {
      add: {
        imports: [MatSnackBarModule],
        providers: [
          {
            provide: FirestoreService,
            useValue: {
              setThemeName: () => true,
            },
          },
        ],
      },
    });
  });

  it('renders', () => {
    cy.mount(ThemeSelectorComponent);
  });

  it('should be setup properly', () => {
    cy.mount(ThemeSelectorComponent);
    cy.getByCy('theme-select-button').should('be.visible').click();
    cy.getByCy('black-white-button').should('be.visible');
    cy.getByCy('black-white-radio-button').should('be.visible');
    cy.getByCy('black-white-display-name')
      .should('be.visible')
      .and('contain.text', 'Black & White');
    cy.getByCy('deeppurple-amber-button').should('be.visible');
    cy.getByCy('deeppurple-amber-radio-button').should('be.visible');
    cy.getByCy('deeppurple-amber-display-name')
      .should('be.visible')
      .and('contain.text', 'Deep Purple & Amber');
    cy.getByCy('indigo-pink-button').should('be.visible');
    cy.getByCy('indigo-pink-radio-button').should('be.visible');
    cy.getByCy('indigo-pink-display-name')
      .should('be.visible')
      .and('contain.text', 'Indigo & Pink');
    cy.getByCy('custom-light-button').should('be.visible');
    cy.getByCy('custom-light-radio-button').should('be.visible');
    cy.getByCy('custom-light-display-name')
      .should('be.visible')
      .and('contain.text', 'User Custom Light');
    cy.getByCy('pink-bluegrey-button').should('be.visible');
    cy.getByCy('pink-bluegrey-radio-button').should('be.visible');
    cy.getByCy('pink-bluegrey-display-name')
      .should('be.visible')
      .and('contain.text', 'Pink & Blue-grey');
    cy.getByCy('purple-green-button').should('be.visible');
    cy.getByCy('purple-green-radio-button').should('be.visible');
    cy.getByCy('purple-green-display-name')
      .should('be.visible')
      .and('contain.text', 'Purple & Green');
    cy.getByCy('red-teal-button').should('be.visible');
    cy.getByCy('red-teal-radio-button').should('be.visible');
    cy.getByCy('red-teal-display-name')
      .should('be.visible')
      .and('contain.text', 'Red & Teal');
    cy.getByCy('custom-dark-button').should('be.visible');
    cy.getByCy('custom-dark-radio-button').should('be.visible');
    cy.getByCy('custom-dark-display-name')
      .should('be.visible')
      .and('contain.text', 'User Custom Dark')
      .click();
  });

  it('should behave appropriately', () => {
    cy.mount(ThemeSelectorComponent);
    cy.getByCy('theme-select-button').click();
    cy.getByCy('black-white-radio-button').click();
    cy.getByCy('theme-select-button').click();
    cy.getByCy('deeppurple-amber-radio-button').click();
    cy.getByCy('theme-select-button').click();
    cy.getByCy('indigo-pink-radio-button').click();
    cy.getByCy('theme-select-button').click();
    cy.getByCy('custom-light-radio-button').click();
    cy.getByCy('theme-select-button').click();
    cy.getByCy('pink-bluegrey-radio-button').click();
    cy.getByCy('theme-select-button').click();
    cy.getByCy('purple-green-radio-button').click();
    cy.getByCy('theme-select-button').click();
    cy.getByCy('red-teal-radio-button').click();
    cy.getByCy('theme-select-button').click();
    cy.getByCy('custom-dark-radio-button').click();
    cy.getByCy('theme-select-button').should('be.visible');
  });
});
