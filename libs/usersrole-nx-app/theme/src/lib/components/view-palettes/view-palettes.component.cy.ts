import { TestBed } from '@angular/core/testing';
import { ViewPalettesComponent } from './view-palettes.component';
import { PaletteComponent } from '../palette/palette.component';

describe(ViewPalettesComponent.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(ViewPalettesComponent, {
      add: {
        imports: [],
        providers: [],
      },
    });
  });

  it('renders', () => {
    cy.mount(ViewPalettesComponent);
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
    cy.mount(ViewPalettesComponent);
    cy.getByCy('primary-title')
      .should('be.visible')
      .and('contain.text', 'Primary');
    cy.getByCy('primary-palette').should('be.visible');
    cy.getByCy('accent-title')
      .should('be.visible')
      .and('contain.text', 'Accent');
    cy.getByCy('accent-palette').should('be.visible');
    cy.getByCy('success-title')
      .should('be.visible')
      .and('contain.text', 'Success');
    cy.getByCy('success-palette').should('be.visible');
    cy.getByCy('error-title').should('be.visible').and('contain.text', 'Error');
    cy.getByCy('error-palette').should('be.visible');
    cy.getByCy('info-title').should('be.visible').and('contain.text', 'Info');
    cy.getByCy('info-palette').should('be.visible');
    cy.getByCy('warn-title').should('be.visible').and('contain.text', 'Warn');
    cy.getByCy('warn-palette').should('be.visible');
  });
}
