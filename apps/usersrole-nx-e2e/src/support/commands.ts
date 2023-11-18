declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Chainable<Subject> {
      getByCy(selector: any, ...args: any[]): Cypress.Chainable<any>;
      getToken(email: string, password: string): Cypress.Chainable<any>;
      deleteUser(email: string): Cypress.Chainable<any>;
      deleteNewUser(id?: string): Cypress.Chainable<any>;
      deleteThemeUser(): Cypress.Chainable<any>;
      createUser(
        email: string,
        displayName: string,
        password: string,
        roles: any[],
      ): Cypress.Chainable<any>;
      createNewUser(id?: string): Cypress.Chainable<any>;
      createThemeUser(): Cypress.Chainable<any>;
      loginWithUser(email: string, password: string): Cypress.Chainable<any>;
      login(userType?: any): Cypress.Chainable<any>;
      changeColor(
        colorSelector: string,
        colorValue: string,
      ): Cypress.Chainable<any>;
      setupAppCheck(): Cypress.Chainable<any>;
      clearFirebaseLocal(): Cypress.Chainable<any>;
    }
  }
}

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
Cypress.Commands.add('getByCy', (selector: any, ...args: any[]) => {
  return cy.get(`[data-cy=${selector}]`, ...args);
});

Cypress.Commands.add('getToken', (email: string, password: string) => {
  return cy.request({
    method: 'POST',
    url: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBEaRY-pKlhpky-y20bKWsbuhFbjTv6WiE',
    body: {
      returnSecureToken: true,
      clientType: 'CLIENT_TYPE_WEB',
      email,
      password,
    },
  });
});

Cypress.Commands.add('deleteUser', (email: string) => {
  cy.fixture('accounts').then((accounts) => {
    cy.getToken(accounts.admin.email, accounts.admin.password).then((res) => {
      cy.request({
        method: 'GET',
        url: `https://us-central1-users-role-nx.cloudfunctions.net/api/users`,
        headers: {
          authorization: `Bearer ${res.body.idToken}`,
        },
      }).then((res) => {
        const uid = res.body.users.find((user: any) => {
          return user.email === email;
        })?.uid;

        if (uid) {
          cy.request({
            method: 'DELETE',
            url: `https://us-central1-users-role-nx.cloudfunctions.net/api/users/${uid}`,
            headers: {
              authorization: res.requestHeaders['authorization'],
            },
          });
        }
      });
    });
  });
});

Cypress.Commands.add('deleteNewUser', (id = '') => {
  cy.fixture('new-user').then((user) => {
    cy.deleteUser(id + user.email);
  });
});

Cypress.Commands.add('deleteThemeUser', () => {
  cy.fixture('theme-user').then((user) => {
    cy.deleteUser(user.email);
  });
});

Cypress.Commands.add(
  'createUser',
  (email: string, displayName: string, password: string, roles) => {
    cy.fixture('accounts').then((accounts) => {
      cy.getToken(accounts.admin.email, accounts.admin.password).then((res) => {
        return cy.request({
          method: 'POST',
          url: `https://us-central1-users-role-nx.cloudfunctions.net/api/users/admin`,
          headers: {
            authorization: `Bearer ${res.body.idToken}`,
          },
          body: {
            email,
            displayName,
            password,
            roles,
          },
        });
      });
    });
  },
);

Cypress.Commands.add('createNewUser', (id = '') => {
  cy.fixture('new-user').then((user) => {
    cy.deleteNewUser(id).then(() => {
      return cy.createUser(
        id + user.email,
        user.displayName,
        user.password,
        user.roles,
      );
    });
  });
});

Cypress.Commands.add('createThemeUser', () => {
  cy.fixture('theme-user').then((user) => {
    cy.deleteThemeUser().then(() => {
      return cy.createUser(
        user.email,
        user.displayName,
        user.password,
        user.roles,
      );
    });
  });
});

Cypress.Commands.add('login', (userType) => {
  cy.fixture('accounts').then((accounts) => {
    if (userType)
      cy.loginWithUser(accounts[userType].email, accounts[userType].password);
    else cy.loginWithUser(accounts.basic.email, accounts.basic.password);
  });
});

Cypress.Commands.add('loginWithUser', (email: string, password: string) => {
  const app = firebase.initializeApp({
    projectId: 'users-role-nx',
    appId: '1:267012633634:web:b1a938b1ab87883bd4c67b',
    storageBucket: 'users-role-nx.appspot.com',
    apiKey: 'AIzaSyBEaRY-pKlhpky-y20bKWsbuhFbjTv6WiE',
    authDomain: 'users-role-nx.firebaseapp.com',
    messagingSenderId: '267012633634',
    measurementId: 'G-33YM05QL2M',
  });
  app.auth().signInWithEmailAndPassword(email, password);
});

Cypress.Commands.add(
  'changeColor',
  (colorSelector: string, colorValue: string) => {
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.getByCy(colorSelector)
      .click()
      .invoke('val', colorValue.toLowerCase())
      .trigger('input')
      .blur();
  },
);

Cypress.Commands.add('clearFirebaseLocal', () => {
  cy.log('Clearing firebase local database');
  new Cypress.Promise(async (resolve) => {
    const req = indexedDB.deleteDatabase('firebaseLocalStorageDb');
    req.onsuccess = function () {
      resolve();
    };
  });
});
