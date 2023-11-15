import { TestBed } from '@angular/core/testing';
import { HomeTileComponent } from './home-tile.component';
import { ActivatedRoute } from '@angular/router';

describe(HomeTileComponent.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(HomeTileComponent, {
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
    cy.mount(HomeTileComponent);
  });

  it('should be setup properly with standard properties', () => {
    cy.mount(HomeTileComponent, {
      componentProperties: {
        title: 'Home',
        description: 'This is the home page',
        access: 'Everyone',
        link: '/home',
      },
    });
    cy.getByCy('home-home-tile')
      .should('be.visible')
      .and('contain.text', 'Home')
      .and('contain.text', 'This is the home page')
      .and('contain.text', 'Access:')
      .and('contain.text', 'Everyone');
  });

  it('should be setup properly with default properties', () => {
    cy.mount(HomeTileComponent);
    cy.getByCy('tile').should('be.visible').and('contain.text', 'Access:');
  });
});
