/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },

  maxWorkers: 1,

  resetMocks: true,
  testMatch: ["**/?(*.)+(spec|test).ts"],
  setupFilesAfterEnv: ["./src/setup-tests.ts"],
};
