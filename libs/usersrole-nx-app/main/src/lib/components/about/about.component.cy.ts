import { AboutComponent } from './about.component';
import { ActivatedRoute } from '@angular/router';
import { VERSION_INFO } from '../../generated/version-info';

describe('AboutComponent', () => {
  beforeEach(() => {
    cy.mount(AboutComponent, {
      providers: [{ provide: ActivatedRoute, useValue: {} }],
    });
  });

  it('should mount', () => {
    cy.getByCy('about-page').should('be.visible');
  });

  it('renders all four info cards', () => {
    cy.getByCy('build-card').should('be.visible');
    // Assert the live Angular runtime line, not a generated dep: the deps map
    // is empty in the committed placeholder version-info.ts.
    cy.getByCy('libraries-card')
      .should('be.visible')
      .and('contain.text', 'Angular (runtime)');
    cy.getByCy('runtime-card').should('be.visible');
    cy.getByCy('project-card')
      .should('be.visible')
      .and('contain.text', 'jdwillmsen/usersrole-nx');
  });

  it('renders the commit link only for non-dev builds', () => {
    // version-info.ts is regenerated with a real commit whenever the app build
    // target runs, so assert against whatever this test build compiled in.
    if (VERSION_INFO.commit === 'dev') {
      cy.getByCy('commit-link').should('not.exist');
    } else {
      cy.getByCy('commit-link')
        .should('be.visible')
        .and('contain.text', VERSION_INFO.commit);
    }
  });
});
