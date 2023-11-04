import { TestBed } from '@angular/core/testing';
import { ButtonsComponent } from './buttons.component';
import { ActivatedRoute } from '@angular/router';

describe(ButtonsComponent.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(ButtonsComponent, {
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
    cy.mount(ButtonsComponent);
  });

  describe('Screen Sizes', () => {
    testScreenSize('XSmall', 400, 400);
    testScreenSize('Small', 800, 800);
    testScreenSize('Medium', 1200, 900);
    testScreenSize('Large', 1600, 1080);
    testScreenSize('XLarge', 2560, 1440);
  });
});

function checkButtonGroup(type: string, title: string) {
  cy.getByCy(`${type}-buttons-title`)
    .should('be.visible')
    .and('contain.text', title);
  cy.getByCy(`${type}-buttons-basic`)
    .should('be.visible')
    .and('contain.text', 'Basic')
    .and('be.enabled');
  cy.getByCy(`${type}-buttons-primary`)
    .should('be.visible')
    .and('contain.text', 'Primary')
    .and('be.enabled');
  cy.getByCy(`${type}-buttons-accent`)
    .should('be.visible')
    .and('contain.text', 'Accent')
    .and('be.enabled');
  cy.getByCy(`${type}-buttons-warn`)
    .should('be.visible')
    .and('contain.text', 'Warn')
    .and('be.enabled');
  cy.getByCy(`${type}-buttons-success`)
    .should('be.visible')
    .and('contain.text', 'Success')
    .and('be.enabled');
  cy.getByCy(`${type}-buttons-error`)
    .should('be.visible')
    .and('contain.text', 'Error')
    .and('be.enabled');
  cy.getByCy(`${type}-buttons-info`)
    .should('be.visible')
    .and('contain.text', 'Info')
    .and('be.enabled');
  cy.getByCy(`${type}-buttons-disabled`)
    .should('be.visible')
    .and('contain.text', 'Disabled')
    .and('not.be.enabled');
  cy.getByCy(`${type}-buttons-link`)
    .should('be.visible')
    .and('contain.text', 'Link');
}

function checkIconButtons(type: string, title: string) {
  cy.getByCy(`${type}-buttons-title`)
    .should('be.visible')
    .and('contain.text', title);
  cy.getByCy(`${type}-buttons-basic`).should('be.visible').and('be.enabled');
  cy.getByCy(`${type}-buttons-primary`).should('be.visible').and('be.enabled');
  cy.getByCy(`${type}-buttons-accent`).should('be.visible').and('be.enabled');
  cy.getByCy(`${type}-buttons-warn`).should('be.visible').and('be.enabled');
  cy.getByCy(`${type}-buttons-success`).should('be.visible').and('be.enabled');
  cy.getByCy(`${type}-buttons-error`).should('be.visible').and('be.enabled');
  cy.getByCy(`${type}-buttons-info`).should('be.visible').and('be.enabled');
  cy.getByCy(`${type}-buttons-disabled`)
    .should('be.visible')
    .should('not.be.enabled');
}

function testScreenSize(size: string, width: number, height: number) {
  it(`should be setup properly on ${size} screen size`, () => {
    cy.viewport(width, height);
    cy.mount(ButtonsComponent);
    checkButtonGroup('basic', 'Basic Buttons');
    checkButtonGroup('raised', 'Raised Buttons');
    checkButtonGroup('stroked', 'Stroked Buttons');
    checkButtonGroup('flat', 'Flat Buttons');
    checkIconButtons('icon', 'Icon Buttons');
    checkButtonGroup('fab', 'Fab Buttons');
    checkButtonGroup('mini-fab', 'Mini Fab Buttons');
  });
}
