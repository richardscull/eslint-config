import e18e from "@e18e/eslint-plugin";
import type { Linter } from "eslint";

import type { Options } from "../option";
import type { LinterConfig } from "../utils";

export function e18eConfig(options: Required<Options>): LinterConfig {
  const configs = e18e.configs as Record<string, Linter.Config>;

  return {
    name: "extend/e18e",
    plugins: {
      e18e,
    },
    rules: {
      ...options.e18e.modernization ? { ...configs.modernization!.rules } : {},
      ...options.e18e.moduleReplacements ? { ...configs.moduleReplacements!.rules } : {},
      ...options.e18e.performanceImprovements ? { ...configs.performanceImprovements!.rules } : {},

      // these are a bit opinionated and dangerous, so we'll disable them for now
      "e18e/prefer-array-to-reversed": "off",
      "e18e/prefer-array-to-sorted": "off",
      "e18e/prefer-array-to-spliced": "off",
      "e18e/prefer-spread-syntax": "off",
    },
  };
}
