module.exports = {

  preset: 'react-native',

  testMatch: [
    '**/__tests__/**/*.test.js?(x)',
  ],

  setupFilesAfterEnv: [
    './jest.setup.js',
  ],

  transformIgnorePatterns: [
    '/@babel/runtime/',
  ],

  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],

  testEnvironment: 'node',

  collectCoverageFrom: [
    '!**/node_modules/**',
    'app/**',
    '!**/__snapshots__/**',
    '!**/*.test.js',
    '!**/__mocks__/**',
    '!**/*.e2e.js',
    '!**/*.styles.*',
    '!**/index.js',
    '!**/*.json',
  ],

  cacheDirectory: './cache',

  watchPathIgnorePatterns: [
    '<rootDir>/node_modules',
    '<rootDir>/cache',
  ],

}
