import { provideZoneChangeDetection } from '@angular/core';
import { getTestBed, TestModuleMetadata } from '@angular/core/testing';
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

// The app bootstraps zone-based change detection (apps/usersrole-nx/src/main.ts),
// so tests must too or interaction-driven updates (menus, snackbars, alerts)
// never re-render. Since Cypress 16, mount appends
// provideZonelessChangeDetection() after the providers it is given, so zone
// providers passed through mount lose; appending them at the TestBed keeps
// them last.
const testBed = getTestBed();
const configureTestingModule = testBed.configureTestingModule.bind(testBed);
testBed.configureTestingModule = (moduleDef: TestModuleMetadata) =>
  configureTestingModule({
    ...moduleDef,
    providers: [...(moduleDef.providers ?? []), provideZoneChangeDetection()],
  });

// Mount also stopped calling autoDetectChanges(), which zoneless fixtures do
// by default but zone fixtures only do when asked. It has to happen after
// mount sets the inputs, or ngOnInit runs against the defaults.
Cypress.Commands.add(
  'mount',
  (
    component: Parameters<typeof mount>[0],
    config?: Parameters<typeof mount>[1],
  ) =>
    mount(component, config).then((mounted) => {
      mounted.fixture.autoDetectChanges();
      return mounted;
    }),
);
