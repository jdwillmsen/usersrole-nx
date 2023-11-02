import { TestBed } from '@angular/core/testing';
import { PaletteComponent } from './palette.component';

describe(PaletteComponent.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(PaletteComponent, {
      add: {
        imports: [],
        providers: [],
      },
    });
  });

  it('renders', () => {
    cy.mount(PaletteComponent);
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
    cy.mount(PaletteComponent);
    cy.getByCy('extra-light')
      .should('be.visible')
      .and('contain.text', 'extra-light');
    cy.getByCy('lighter').should('be.visible').and('contain.text', 'lighter');
    cy.getByCy('default').should('be.visible').and('contain.text', 'default');
    cy.getByCy('darker').should('be.visible').and('contain.text', 'darker');
    cy.getByCy('extra-dark')
      .should('be.visible')
      .and('contain.text', 'extra-dark');
    cy.getByCy('900').should('be.visible').and('contain.text', '900');
    cy.getByCy('800').should('be.visible').and('contain.text', '800');
    cy.getByCy('700').should('be.visible').and('contain.text', '700');
    cy.getByCy('600').should('be.visible').and('contain.text', '600');
    cy.getByCy('500').should('be.visible').and('contain.text', '500');
    cy.getByCy('400').should('be.visible').and('contain.text', '400');
    cy.getByCy('300').should('be.visible').and('contain.text', '300');
    cy.getByCy('200').should('be.visible').and('contain.text', '200');
    cy.getByCy('100').should('be.visible').and('contain.text', '100');
    cy.getByCy('50').should('be.visible').and('contain.text', '50');
    cy.getByCy('A100').should('be.visible').and('contain.text', 'A100');
    cy.getByCy('A200').should('be.visible').and('contain.text', 'A200');
    cy.getByCy('A400').should('be.visible').and('contain.text', 'A400');
    cy.getByCy('A700').should('be.visible').and('contain.text', 'A700');
  });
}
