describe('Navigation', () => {
  before(() => {
    cy.clearFirebaseLocal();
  });

  after(() => {
    cy.clearFirebaseLocal();
  });

  describe('Basic Account', () => {
    before(() => {
      cy.login('basic').then(() => {
        cy.visit('/');
      });
    });

    after('should be able to sign out', () => {
      checkSignOut();
    });

    it('should have all the nav routes setup correctly', () => {
      cy.visit('/home');
      checkUserNavItems();
      cy.getByCy('expand-toggle-button').click();
      checkUserExpandedNavItems();
    });

    it('should have the nav route link to correct route', () => {
      cy.visit('/home');
      checkUserRouteLinks();
    });

    it('should route the user to the appropriate link on home page tiles', () => {
      cy.visit('/home');
      checkUserHomeTiles();
      cy.getByCy('users-tile').click();
      cy.url().should('include', '/forbidden');
      cy.getByCy('app-title').click();
      cy.getByCy('roles-tile').click();
      cy.url().should('include', '/forbidden');
      cy.getByCy('redirect-button').click();
      cy.url().should('include', '/home');
    });

    it('should bring use to the correct page on link visit', () => {
      checkUserLinks();
      cy.visit('/admin/users');
      cy.url().should('include', '/forbidden');
      cy.visit('/admin/roles');
      cy.url().should('include', '/forbidden');
    });

    it('should be setup and work properly on small sizes', () => {
      checkSmallScreens();
    });
  });

  describe('Read Account', () => {
    before(() => {
      cy.login('read').then(() => {
        cy.visit('/');
      });
    });

    adminTests();
  });

  describe('Manager Account', () => {
    before(() => {
      cy.login('manager').then(() => {
        cy.visit('/');
      });
    });

    adminTests();
  });

  describe('Admin Account', () => {
    before(() => {
      cy.login('admin').then(() => {
        cy.visit('/');
      });
    });

    adminTests();
  });
});

function checkUserNavItems() {
  cy.getByCy('home-navigation-item')
    .should('be.visible')
    .within(() => {
      cy.getByCy('navigation-icon').should('be.visible');
      cy.getByCy('navigation-title').should('not.exist');
    });
  cy.getByCy('profile-navigation-item')
    .should('be.visible')
    .within(() => {
      cy.getByCy('navigation-icon').should('be.visible');
      cy.getByCy('navigation-title').should('not.exist');
    });
  cy.getByCy('alerts-navigation-item')
    .should('be.visible')
    .within(() => {
      cy.getByCy('navigation-icon').should('be.visible');
      cy.getByCy('navigation-title').should('not.exist');
    });
  cy.getByCy('snackbars-navigation-item')
    .should('be.visible')
    .within(() => {
      cy.getByCy('navigation-icon').should('be.visible');
      cy.getByCy('navigation-title').should('not.exist');
    });
  cy.getByCy('buttons-navigation-item')
    .should('be.visible')
    .within(() => {
      cy.getByCy('navigation-icon').should('be.visible');
      cy.getByCy('navigation-title').should('not.exist');
    });
  cy.getByCy('palettes-navigation-item')
    .should('be.visible')
    .within(() => {
      cy.getByCy('navigation-icon').should('be.visible');
      cy.getByCy('navigation-title').should('not.exist');
    });
  cy.getByCy('theme-navigation-item')
    .should('be.visible')
    .within(() => {
      cy.getByCy('navigation-icon').should('be.visible');
      cy.getByCy('navigation-title').should('not.exist');
    });
}

function checkUserExpandedNavItems() {
  cy.getByCy('home-navigation-item')
    .should('be.visible')
    .within(() => {
      cy.getByCy('navigation-icon').should('be.visible');
      cy.getByCy('navigation-title')
        .should('be.visible')
        .and('contain.text', 'Home');
    });
  cy.getByCy('profile-navigation-item')
    .should('be.visible')
    .within(() => {
      cy.getByCy('navigation-icon').should('be.visible');
      cy.getByCy('navigation-title')
        .should('be.visible')
        .and('contain.text', 'Profile');
    });
  cy.getByCy('alerts-navigation-item')
    .should('be.visible')
    .within(() => {
      cy.getByCy('navigation-icon').should('be.visible');
      cy.getByCy('navigation-title')
        .should('be.visible')
        .and('contain.text', 'Alerts');
    });
  cy.getByCy('snackbars-navigation-item')
    .should('be.visible')
    .within(() => {
      cy.getByCy('navigation-icon').should('be.visible');
      cy.getByCy('navigation-title')
        .should('be.visible')
        .and('contain.text', 'Snackbars');
    });
  cy.getByCy('buttons-navigation-item')
    .should('be.visible')
    .within(() => {
      cy.getByCy('navigation-icon').should('be.visible');
      cy.getByCy('navigation-title')
        .should('be.visible')
        .and('contain.text', 'Buttons');
    });
  cy.getByCy('palettes-navigation-item')
    .should('be.visible')
    .within(() => {
      cy.getByCy('navigation-icon').should('be.visible');
      cy.getByCy('navigation-title')
        .should('be.visible')
        .and('contain.text', 'Palettes');
    });
  cy.getByCy('theme-navigation-item')
    .should('be.visible')
    .within(() => {
      cy.getByCy('navigation-icon').should('be.visible');
      cy.getByCy('navigation-title')
        .should('be.visible')
        .and('contain.text', 'Theme');
    });
}

function checkUserRouteLinks() {
  cy.getByCy('home-navigation-item').click();
  cy.url().should('include', '/home');
  cy.getByCy('profile-navigation-item').click();
  cy.url().should('include', '/profile');
  cy.getByCy('alerts-navigation-item').click();
  cy.url().should('include', '/preview/alerts');
  cy.getByCy('snackbars-navigation-item').click();
  cy.url().should('include', '/preview/snackbars');
  cy.getByCy('buttons-navigation-item').click();
  cy.url().should('include', '/preview/buttons');
  cy.getByCy('palettes-navigation-item').click();
  cy.url().should('include', '/theme/view');
  cy.getByCy('theme-navigation-item').click();
  cy.url().should('include', '/theme/create');
}

function checkUserHomeTiles() {
  cy.getByCy('home-tile').click();
  cy.url().should('include', '/home');
  cy.getByCy('profile-tile').click();
  cy.url().should('include', '/profile');
  cy.getByCy('app-title').click();
  cy.getByCy('alerts-tile').click();
  cy.url().should('include', '/preview/alerts');
  cy.getByCy('app-title').click();
  cy.getByCy('snackbars-tile').click();
  cy.url().should('include', '/preview/snackbars');
  cy.getByCy('app-title').click();
  cy.getByCy('buttons-tile').click();
  cy.url().should('include', '/preview/buttons');
  cy.getByCy('app-title').click();
  cy.getByCy('palettes-tile').click();
  cy.url().should('include', '/theme/view');
  cy.getByCy('app-title').click();
  cy.getByCy('theme-tile').click();
  cy.url().should('include', '/theme/create');
  cy.getByCy('app-title').click();
}

function checkUserLinks() {
  cy.visit('/');
  cy.url().should('include', '/home');
  cy.visit('/sign-in');
  cy.url().should('include', '/home');
  cy.visit('/not-a-valid-link');
  cy.url().should('include', '/home');
  cy.visit('/home');
  cy.url().should('include', '/home');
  cy.visit('/profile');
  cy.url().should('include', '/profile');
  cy.visit('/preview/alerts');
  cy.url().should('include', '/preview/alerts');
  cy.visit('/preview/snackbars');
  cy.url().should('include', '/preview/snackbars');
  cy.visit('/preview/buttons');
  cy.url().should('include', '/preview/buttons');
  cy.visit('/theme/view');
  cy.url().should('include', '/theme/view');
  cy.visit('/theme/create');
  cy.url().should('include', '/theme/create');
}

function checkAdminNavItems() {
  cy.getByCy('users-navigation-item')
    .should('be.visible')
    .within(() => {
      cy.getByCy('navigation-icon').should('be.visible');
      cy.getByCy('navigation-title').should('not.exist');
    });
  cy.getByCy('roles-navigation-item')
    .should('be.visible')
    .within(() => {
      cy.getByCy('navigation-icon').should('be.visible');
      cy.getByCy('navigation-title').should('not.exist');
    });
}

function checkAdminExpandedNavItems() {
  cy.getByCy('users-navigation-item')
    .should('be.visible')
    .within(() => {
      cy.getByCy('navigation-icon').should('be.visible');
      cy.getByCy('navigation-title')
        .should('be.visible')
        .and('contain.text', 'Users');
    });
  cy.getByCy('roles-navigation-item')
    .should('be.visible')
    .within(() => {
      cy.getByCy('navigation-icon').should('be.visible');
      cy.getByCy('navigation-title')
        .should('be.visible')
        .and('contain.text', 'Roles');
    });
}

function checkAdminRouteLinks() {
  cy.getByCy('users-navigation-item').click();
  cy.url().should('include', '/admin/users');
  cy.getByCy('roles-navigation-item').click();
  cy.url().should('include', '/admin/roles');
}

function checkAdminHomeTiles() {
  cy.getByCy('users-tile').click();
  cy.url().should('include', '/admin/users');
  cy.getByCy('app-title').click();
  cy.getByCy('roles-tile').click();
  cy.url().should('include', '/admin/roles');
}

function checkAdminLinks() {
  cy.visit('/admin/users');
  cy.url().should('include', '/admin/users');
  cy.visit('/admin/roles');
  cy.url().should('include', '/admin/roles');
}

function checkSignOut() {
  cy.visit('/home');
  cy.getByCy('sign-out-card-button').click();
  cy.getByCy('sign-out').click();
  cy.url().should('include', '/sign-in');
  cy.getByCy('snackbar-container')
    .should('be.visible')
    .within(() => {
      cy.getByCy('message').should('contain.text', 'Sign out successful');
    });
}

function checkSmallScreens() {
  cy.viewport(300, 600);
  cy.visit('/home');
  cy.getByCy('nav-list').should('not.be.visible');
  cy.getByCy('navbar-button').click();
  cy.getByCy('nav-list').should('be.visible');
  cy.get('.mat-drawer-backdrop').click({ force: true });
  cy.getByCy('nav-list').should('not.be.visible');
  cy.getByCy('navbar-button').click();
  cy.getByCy('nav-list').should('be.visible');
  cy.getByCy('navbar-button').click();
  cy.getByCy('nav-list').should('not.be.visible');
  cy.getByCy('navbar-button').click();
  checkUserExpandedNavItems();
}

function adminTests() {
  after('should be able to sign out', () => {
    checkSignOut();
  });

  it('should have all the nav routes setup correctly', () => {
    cy.visit('/home');
    checkUserNavItems();
    checkAdminNavItems();
    cy.getByCy('expand-toggle-button').click();
    checkUserExpandedNavItems();
    checkAdminExpandedNavItems();
  });

  it('should have the nav route link to correct route', () => {
    cy.visit('/home');
    checkUserRouteLinks();
    checkAdminRouteLinks();
  });

  it('should route the user to the appropriate link on home page tiles', () => {
    cy.visit('/home');
    checkUserHomeTiles();
    checkAdminHomeTiles();
  });

  it('should bring use to the correct page on link visit', () => {
    checkUserLinks();
    checkAdminLinks();
  });

  it('should be setup and work properly on small sizes', () => {
    checkSmallScreens();
    checkAdminExpandedNavItems();
  });
}
