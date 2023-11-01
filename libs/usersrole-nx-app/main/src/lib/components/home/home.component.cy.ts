import { TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { ActivatedRoute } from '@angular/router';

describe(HomeComponent.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(HomeComponent, {
      add: {
        imports: [],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {},
          },
        ],
      },
    });
  });

  it('renders', () => {
    cy.mount(HomeComponent);
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
    cy.mount(HomeComponent);
    cy.getByCy('home-container').should('be.visible');
    cy.getByCy('title')
      .should('be.visible')
      .and('contain.text', 'Users Role NX');
    cy.getByCy('p1').should('be.visible').and('not.be.empty');
    cy.getByCy('p2').should('be.visible').and('not.be.empty');
    cy.getByCy('p3').should('be.visible').and('not.be.empty');
    cy.getByCy('p4').should('be.visible').and('not.be.empty');
    cy.getByCy('read-message').should('be.visible').and('not.be.empty');
    cy.getByCy('home-tile').should('be.visible');
    cy.getByCy('profile-tile').should('be.visible');
    cy.getByCy('alerts-tile').should('be.visible');
    cy.getByCy('snackbars-tile').should('be.visible');
    cy.getByCy('buttons-tile').should('be.visible');
    cy.getByCy('palettes-tile').should('be.visible');
    cy.getByCy('theme-tile').should('be.visible');
    cy.getByCy('users-tile').should('be.visible');
    cy.getByCy('roles-tile').should('be.visible');
  });
}
