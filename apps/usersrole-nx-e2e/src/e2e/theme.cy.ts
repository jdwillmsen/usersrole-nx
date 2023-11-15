describe('Theme', () => {
  before(() => {
    cy.clearFirebaseLocal();
  });

  after(() => {
    cy.clearFirebaseLocal();
  });

  describe('Theme Account', () => {
    before(() => {
      cy.createThemeUser();
      cy.fixture('theme-user').then((user) => {
        cy.loginWithUser(user.email, user.password).then(() => {
          cy.visit('/');
        });
      });
    });

    after(() => {
      cy.deleteThemeUser();
    });

    it('should be able to change themes', () => {
      cy.visit('/theme/view');
      cy.getByCy('theme-select-button').click();
      cy.getByCy('black-white-button').click();
      cy.getByCy('navbar-header').should(
        'have.css',
        'background-color',
        'rgb(0, 0, 0)'
      );
      cy.getByCy('theme-select-button').click();
      cy.getByCy('deeppurple-amber-button').click();
      cy.getByCy('navbar-header').should(
        'have.css',
        'background-color',
        'rgb(103, 58, 183)'
      );
      cy.getByCy('theme-select-button').click();
      cy.getByCy('indigo-pink-button').click();
      cy.getByCy('navbar-header').should(
        'have.css',
        'background-color',
        'rgb(63, 81, 181)'
      );
      cy.getByCy('theme-select-button').click();
      cy.getByCy('custom-light-button').click();
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(500); // Waiting for dynamic theme to be applied
      cy.getByCy('navbar-header').should(
        'have.css',
        'background-color',
        'rgb(125, 207, 42)'
      );
      cy.getByCy('theme-select-button').click();
      cy.getByCy('pink-bluegrey-button').click();
      cy.getByCy('navbar-header').should(
        'have.css',
        'background-color',
        'rgb(233, 30, 99)'
      );
      cy.getByCy('theme-select-button').click();
      cy.getByCy('purple-green-button').click();
      cy.getByCy('navbar-header').should(
        'have.css',
        'background-color',
        'rgb(156, 39, 176)'
      );
      cy.getByCy('theme-select-button').click();
      cy.getByCy('red-teal-button').click();
      cy.getByCy('navbar-header').should(
        'have.css',
        'background-color',
        'rgb(255, 0, 0)'
      );
      cy.getByCy('theme-select-button').click();
      cy.getByCy('custom-dark-button').click();
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(500); // Waiting for dynamic theme to be applied
      cy.getByCy('navbar-header').should(
        'have.css',
        'background-color',
        'rgb(125, 207, 42)'
      );
    });

    it('should be able to create a custom light and dark theme', () => {
      cy.visit('/theme/create');
      cy.getByCy('primary-palette').within(() => {
        cy.changeColor('main-color-input', '#00ffaa');
      });
      cy.getByCy('accent-palette').within(() => {
        cy.changeColor('main-color-input', '#ff77aa');
      });
      cy.getByCy('warn-palette').within(() => {
        cy.changeColor('main-color-input', '#fff000');
      });
      cy.getByCy('success-palette').within(() => {
        cy.changeColor('main-color-input', '#00aa00');
      });
      cy.getByCy('error-palette').within(() => {
        cy.changeColor('main-color-input', '#ff0000');
      });
      cy.getByCy('info-palette').within(() => {
        cy.changeColor('main-color-input', '#00f0ff');
      });
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(500); // Wait for algorithm to finish as it's on debounce
      cy.getByCy('save-light-theme-button').click();
      cy.getByCy('snackbar-container')
        .should('be.visible')
        .within(() => {
          cy.getByCy('message').should(
            'contain.text',
            'Saved light theme successfully'
          );
          cy.getByCy('close-button').click();
        });
      cy.getByCy('primary-palette').within(() => {
        cy.changeColor('main-color-input', '#ee66ee');
      });
      cy.getByCy('accent-palette').within(() => {
        cy.changeColor('main-color-input', '#aaffff');
      });
      cy.getByCy('warn-palette').within(() => {
        cy.changeColor('main-color-input', '#ff5500');
      });
      cy.getByCy('success-palette').within(() => {
        cy.changeColor('main-color-input', '#00ff00');
      });
      cy.getByCy('error-palette').within(() => {
        cy.changeColor('main-color-input', '#fe0fe0');
      });
      cy.getByCy('info-palette').within(() => {
        cy.changeColor('main-color-input', '#1010ff');
      });
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(500); // Wait for algorithm to finish as it's on debounce
      cy.getByCy('save-dark-theme-button').click();
      cy.getByCy('snackbar-container')
        .should('be.visible')
        .within(() => {
          cy.getByCy('message').should(
            'contain.text',
            'Saved dark theme successfully'
          );
          cy.getByCy('close-button').click();
        });
    });
  });
});
