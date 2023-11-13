import { TestBed } from '@angular/core/testing';
import { RolesCellRendererComponent } from './roles-cell-renderer.component';

describe(RolesCellRendererComponent.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(RolesCellRendererComponent, {
      add: {
        imports: [],
        providers: [],
      },
    });
  });

  it('renders', () => {
    cy.mount(RolesCellRendererComponent);
  });

  it('should show multiple roles', () => {
    cy.mount(RolesCellRendererComponent, {
      componentProperties: {
        roles: ['user', 'read', 'manager', 'admin'],
      },
    });
    cy.getByCy('role-chip').should('have.length', 4).and('be.visible');
    cy.contains('USER');
    cy.contains('READ');
    cy.contains('MANAGER');
    cy.contains('ADMIN');
  });
});
