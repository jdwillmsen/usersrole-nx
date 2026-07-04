import { provideZoneChangeDetection } from '@angular/core';
import { mount } from 'cypress/angular';
// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.ts using ES2015 syntax:
import './commands';

// add component testing only related command here, such as mount
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Chainable<Subject> {
      mount: typeof mount;
    }
  }
}

// The app bootstraps zone-based change detection (apps/usersrole-nx/src/main.ts).
// Angular 21 TestBed defaults to zoneless, so mount must mirror the app or
// interaction-driven updates (menus, snackbars) never re-render in tests.
Cypress.Commands.add(
  'mount',
  (
    component: Parameters<typeof mount>[0],
    config?: Parameters<typeof mount>[1],
  ) =>
    mount(component, {
      ...config,
      providers: [provideZoneChangeDetection(), ...(config?.providers ?? [])],
    }),
);
