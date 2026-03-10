const nextJest = require("next/jest.js");

const createJestConfig = nextJest({
  dir: "./",
});

const config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^@repo/types$": "<rootDir>/../../packages/types",
    "^@repo/ui$": "<rootDir>/../../packages/ui",
    "^@repo/data$": "<rootDir>/../../packages/data",
  },
};

module.exports = createJestConfig(config);
