const nxPreset = require('@nx/jest/preset').default;

module.exports = {
  ...nxPreset,
  // firebase v10+ requires the Fetch API; plain jsdom doesn't provide it
  testEnvironment: 'jest-fixed-jsdom',
};
