import { AboutComponent } from './about.component';

describe(AboutComponent.name, () => {
  it('renders', () => {
    cy.mount(AboutComponent);
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
    cy.mount(AboutComponent);
    cy.getByCy('about-container').should('be.visible');
    cy.getByCy('title')
      .should('be.visible')
      .and('contain.text', 'About Users Role NX');
    cy.getByCy('description').should('be.visible').and('not.be.empty');
    cy.getByCy('stack-title').should('be.visible');
    cy.getByCy('stack').should('be.visible');
    cy.getByCy('angular-stack-item').should('be.visible');
    cy.getByCy('nx-stack-item').should('be.visible');
    cy.getByCy('firebase-stack-item').should('be.visible');
    cy.getByCy('source-title').should('be.visible');
    cy.getByCy('source-link')
      .should('be.visible')
      .and('have.attr', 'href', 'https://github.com/jdwillmsen/usersrole-nx');
  });
}
