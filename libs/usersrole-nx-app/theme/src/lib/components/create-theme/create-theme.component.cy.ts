import { TestBed } from '@angular/core/testing';
import { CreateThemeComponent } from './create-theme.component';

describe(CreateThemeComponent.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(CreateThemeComponent, {
      add: {
        imports: [],
        providers: [],
      },
    });
  });

  it('renders', () => {
    cy.mount(CreateThemeComponent);
  });

  describe('Screen Sizes', () => {
    testScreenSize('XSmall', 400, 400);
    testScreenSize('Small', 800, 800);
    testScreenSize('Medium', 1200, 900);
    testScreenSize('Large', 1600, 1080);
    testScreenSize('XLarge', 2560, 1440);
  });

  it('should save the themes', () => {
    cy.mount(CreateThemeComponent);
    cy.getByCy('primary-palette').within(() => {
      changeColor('main', '#ff5349');
    });
    cy.getByCy('accent-palette').within(() => {
      changeColor('main', '#f4c430');
    });
    cy.getByCy('warn-palette').within(() => {
      changeColor('main', '#ff9800');
    });
    cy.getByCy('success-palette').within(() => {
      changeColor('main', '#4caf50');
    });
    cy.getByCy('error-palette').within(() => {
      changeColor('main', '#e006b8');
    });
    cy.getByCy('info-palette').within(() => {
      changeColor('main', '#2196f3');
    });
    cy.getByCy('save-light-theme-button').click();
    // TODO: update test when button functionality is implemented
    // cy.getByCy('snackbar-container')
    //   .should('be.visible')
    //   .and('contain.text', 'Saved light theme successfully');
    cy.getByCy('save-dark-theme-button').click();
    // cy.getByCy('snackbar-container')
    //   .should('be.visible')
    //   .and('contain.text', 'Saved dark theme successfully');
  });
});

function testScreenSize(size: string, width: number, height: number) {
  it(`should be setup properly on ${size} screen size`, () => {
    cy.viewport(width, height);
    cy.mount(CreateThemeComponent);
    cy.getByCy('title')
      .should('be.visible')
      .and('contain.text', 'Create Custom Theme');
    cy.getByCy('save-light-theme-button')
      .should('be.visible')
      .and('contain.text', 'Save Light Theme');
    cy.getByCy('save-dark-theme-button')
      .should('be.visible')
      .and('contain.text', 'Save Dark Theme');
    cy.getByCy('primary-palette').should('be.visible');
    cy.getByCy('accent-palette').should('be.visible');
    cy.getByCy('info-palette').should('be.visible');
    cy.getByCy('error-palette').should('be.visible');
    cy.getByCy('success-palette').should('be.visible');
    cy.getByCy('warn-palette').should('be.visible');
  });
}

function changeColor(colorSelectorNumber: string, colorValue: string) {
  cy.changeColor(`${colorSelectorNumber}-color-input`, colorValue);
}
