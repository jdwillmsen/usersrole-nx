import { TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ENVIRONMENT, UsersService } from '@usersrole-nx/core';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe(ProfileComponent.name, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      providers: [
        {
          provide: ENVIRONMENT,
          useValue: {
            production: false,
            firebase: {},
            functionsBaseUrl: '',
          },
        },
      ],
    }).overrideComponent(ProfileComponent, {
      add: {
        imports: [HttpClientModule, MatSnackBarModule],
        providers: [
          {
            provide: AngularFireAuth,
            useValue: {},
          },
        ],
      },
    });
  });

  it('renders', () => {
    cy.mount(ProfileComponent);
  });

  describe('Screen Sizes', () => {
    testScreenSize('XSmall', 500, 500);
    testScreenSize('Small', 800, 800);
    testScreenSize('Medium', 1200, 900);
    testScreenSize('Large', 1600, 1080);
    testScreenSize('XLarge', 2560, 1440);
  });
});

function testScreenSize(size: string, width: number, height: number) {
  describe(`${size}`, () => {
    beforeEach(() => {
      cy.viewport(width, height);
    });

    it(`should be setup properly on ${size} screen size`, () => {
      cy.mount(ProfileComponent);
      cy.getByCy('title').should('be.visible').and('contain.text', 'Profile');
      cy.getByCy('email-address-field')
        .should('be.visible')
        .and('contain.text', 'Email Address');
      cy.getByCy('display-name-field')
        .should('be.visible')
        .and('contain.text', 'Display Name');
      cy.getByCy('roles-field')
        .should('be.visible')
        .and('contain.text', 'Roles');
    });

    it('should be setup appropriately with values', () => {
      cy.intercept(
        {
          method: 'GET',
          url: '/users/*',
        },
        ''
      ).as('getUsers');
      TestBed.overrideComponent(ProfileComponent, {
        set: {
          providers: [
            {
              provide: AngularFireAuth,
              useValue: {
                user: of(() => true),
              },
            },
            {
              provide: UsersService,
              useValue: {
                user$: () =>
                  of({
                    uid: 'test-uid',
                    email: 'test@usersrole-nx.com',
                    displayName: 'Tester',
                    roles: ['user'],
                  }),
              },
            },
          ],
        },
      });
      cy.mount(ProfileComponent);
      cy.getByCy('email-address-field')
        .should('be.visible')
        .find('input')
        .should('contain.value', 'test@usersrole-nx.com');
      cy.getByCy('display-name-field')
        .should('be.visible')
        .find('input')
        .and('contain.value', 'Tester');
      cy.getByCy('roles-field')
        .should('be.visible')
        .find('input')
        .and('contain.value', 'User');
    });
  });
}
