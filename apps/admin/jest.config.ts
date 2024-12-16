import type { Config } from "@jest/types";
import { jestConfig } from "@nova/jest-config/jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config.InitialOptions = {
  ...jestConfig,
  coverageProvider: "v8",
  testEnvironment: "jsdom",
};

export default createJestConfig(config);
