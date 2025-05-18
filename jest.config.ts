// import type { Config } from 'jest'
// import nextJest from 'next/jest.js'

// const createJestConfig = nextJest({
//   dir: './',
// })

// const config: Config = {
//   clearMocks: true,
//   collectCoverage: true,
//   coverageDirectory: "coverage",
//   coverageProvider: "v8",
//   coverageThreshold: undefined,
//   fakeTimers: {
//     "enableGlobally": false
//   },
//   setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
//   testEnvironment: "jsdom",
//   moduleNameMapper: {
//     '^@/(.*)$': '<rootDir>/src/$1',
//   },
// };

// export default createJestConfig(config);


import nextJest from 'next/jest'
import type { Config } from 'jest'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  transformIgnorePatterns: [
    '/node_modules/(?!(uuid|big\\.js)/)',
  ],
  fakeTimers: { enableGlobally: false },
  testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'],
  testEnvironment: 'jsdom',
}

export default createJestConfig(config)
