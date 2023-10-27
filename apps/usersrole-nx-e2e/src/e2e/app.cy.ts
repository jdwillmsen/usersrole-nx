describe('usersrole-nx', () => {
  beforeEach(() => cy.visit('/'));

  it('should be running', () => {
    cy.url().should('contain', '');
  });
});
