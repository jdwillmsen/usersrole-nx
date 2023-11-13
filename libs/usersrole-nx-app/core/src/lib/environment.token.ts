import { InjectionToken } from '@angular/core';

export interface Environment {
  production: boolean;
  firebase: Record<string, string>;
  functionsBaseUrl: string;
}

/**
 * @const ENVIRONMENT
 * Injection token for the environment interface to be provided by the applications.
 */
export const ENVIRONMENT: InjectionToken<Environment> = new InjectionToken(
  'ENVIRONMENT'
);
