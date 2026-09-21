import { dirname } from 'path';
import { fileURLToPath } from 'url';
import baseConfig from '../../eslint.config.mjs';
import nx from '@nx/eslint-plugin';

export default [
  ...baseConfig,
  ...nx.configs['flat/angular'],
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'usersroleNx',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'usersrole-nx',
          style: 'kebab-case',
        },
      ],
      '@angular-eslint/prefer-standalone': 'off',
      // angular-eslint 22 enables this by default and it flags every component
      // here, none of which use OnPush. It is a behaviour change rather than a
      // lint fix: OnPush stops a component re-rendering on anything but its own
      // inputs, events and async pipes, so adopting it blind silently breaks
      // views that rely on default change detection. Worth doing deliberately,
      // per component, with the UI exercised -- not inside an Angular upgrade.
      '@angular-eslint/prefer-on-push-component-change-detection': 'off',
    },
  },
  ...nx.configs['flat/angular-template'],
];
