import { TestBed } from '@angular/core/testing';
import { NavigationTileComponent } from './navigation-tile.component';
import { ActivatedRoute } from '@angular/router';

describe(NavigationTileComponent.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(NavigationTileComponent, {
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
    cy.mount(NavigationTileComponent);
  });

  it('should be setup properly with standard properties', () => {
    cy.mount(
      `<usersrole-nx-navigation-tile 
                   [title]="'Home'"
                   [description]="'This is the home page'"
                   [link]="'/home'"
                 >
                   <b>Access:&nbsp;</b>
                   Everyone
                 </usersrole-nx-navigation-tile>`,
      {
        imports: [NavigationTileComponent],
      }
    );
    cy.getByCy('tile').should('be.visible');
    cy.getByCy('title').should('be.visible').and('contain.text', 'Home');
    cy.getByCy('message')
      .should('be.visible')
      .and('contain.text', 'This is the home page');
    cy.getByCy('extra')
      .should('be.visible')
      .and('contain.text', 'Access:')
      .and('contain.text', 'Everyone');
  });

  it('should setup properly with default properties', () => {
    cy.mount(NavigationTileComponent);
    cy.getByCy('tile').should('be.visible');
    cy.getByCy('title').should('be.visible').and('not.contain.text');
    cy.getByCy('message').should('be.visible').and('not.contain.text');
    cy.getByCy('extra').should('be.visible').and('not.contain.text');
  });

  it('should setup properly with no extra content', () => {
    cy.mount(NavigationTileComponent, {
      componentProperties: {
        title: 'Test',
        description: 'This is a test',
      },
    });
    cy.getByCy('tile').should('be.visible');
    cy.getByCy('title').should('be.visible').and('contain.text', 'Test');
    cy.getByCy('message')
      .should('be.visible')
      .and('contain.text', 'This is a test');
    cy.getByCy('extra').should('be.visible').and('not.contain.text');
  });
});
