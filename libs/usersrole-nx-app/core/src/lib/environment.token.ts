import { InjectionToken } from '@angular/core';

export interface Environment {
  production: boolean;
  firebase: Record<string, string>;
  functionsBaseUrl: string;
  // Points the Firebase SDK at the local Emulator Suite instead of the project
  // named in `firebase`, so the app runs with no Google account or billing.
  useEmulators?: boolean;
}

/**
 * @const ENVIRONMENT
 * Injection token for the environment interface to be provided by the applications.
 */
export const ENVIRONMENT: InjectionToken<Environment> = new InjectionToken(
  'ENVIRONMENT',
);
