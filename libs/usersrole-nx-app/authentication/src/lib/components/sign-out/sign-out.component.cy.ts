import { TestBed } from '@angular/core/testing';
import { SignOutComponent } from './sign-out.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe(SignOutComponent.name, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AngularFireAuth,
          useValue: {},
        },
      ],
    }).overrideComponent(SignOutComponent, {
      add: {
        imports: [MatSnackBarModule],
      },
    });
  });

  it('renders', () => {
    cy.mount(SignOutComponent);
  });

  it('should be setup properly', () => {
    cy.mount(SignOutComponent);
    cy.getByCy('sign-out-button')
      .should('be.visible')
      .and('be.enabled')
      .and('contain.text', 'Sign Out');
  });
});
