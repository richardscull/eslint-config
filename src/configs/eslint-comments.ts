import eslintComments from "@eslint-community/eslint-plugin-eslint-comments";

import type { LinterConfig } from "../utils";

export function eslintCommentsConfig() {
  return {
    name: "extend/eslint-comments",
    plugins: {
      "eslint-comments": eslintComments,
    },
    rules: {
      "eslint-comments/require-description": ["error", { ignore: [] }],
    },
  } satisfies LinterConfig;
}
