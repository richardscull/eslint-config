# richardscull's eslint-config

richardscull's ESLint Fork (original by hyoban) Config enables most of the recommended rules for `js`, `ts`, and `react`, uses ESLint for formatting, and provides a lot of useful plugins.

> [!TIP]
> You may not need `lint-staged` and `simple-git-hooks` if you don't ignore auto-fix for rules in the editor.

```sh
ni i -D eslint @richardscull/eslint-config lint-staged simple-git-hooks
```

If you are using ESLint 9.9.0 and `eslint.config.ts`, you need to install `jiti`.

```sh
ni -D jiti
```

> [!TIP]
> You can install the nightly version from [pkg.pr.new](https://github.com/stackblitz-labs/pkg.pr.new), for example, `ni -D https://pkg.pr.new/hyoban/eslint-config-hyoban@{commit}`.

`eslint.config.mjs` or `eslint.config.ts` if you are using ESLint 9.9.0.

```ts
// @ts-check
import { defineConfig } from '@richardscull/eslint-config'

export default defineConfig()
```

> [!TIP]
> You can customize the preset by passing options according to [available options](https://github.com/hyoban/eslint-config-hyoban/blob/main/src/option.ts)

`package.json`

```json
{
  "scripts": {
    "lint": "eslint",
    "lint:fix": "eslint --fix",
    "prepare": "simple-git-hooks"
  },
  "simple-git-hooks": {
    "pre-commit": "npx lint-staged"
  },
  "lint-staged": {
    "*": "eslint --fix"
  }
}
```

```jsonc
{
  // You shouldn't use formatter with this ESLint config
  "[javascript][javascriptreact][typescript][typescriptreact][json][jsonc]": {
    "editor.formatOnSave": false,
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": "explicit"
    }
  },

  // If you do not want to auto fix some rules on save
  // You can put this in your user settings or workspace settings
  "eslint.codeActionsOnSave.rules": [
    "!prefer-const",
    "!unused-imports/no-unused-imports",
    "!@stylistic/jsx-self-closing-comp",
    "!tailwindcss/classnames-order",
    "*"
  ],

  // If you want to silent stylistic rules
  // You can put this in your user settings or workspace settings
  "eslint.rules.customizations": [
    { "rule": "@stylistic/*", "severity": "off", "fixable": true },
    { "rule": "antfu/consistent-list-newline", "severity": "off" },
    { "rule": "hyoban/jsx-attribute-spacing", "severity": "off" },
    { "rule": "simple-import-sort/*", "severity": "off" },
    { "rule": "prefer-const", "severity": "off" },
    { "rule": "unused-imports/no-unused-imports", "severity": "off" },
    { "rule": "tailwindcss/classnames-order", "severity": "off" }
  ],

  // You can also silent all auto fixable rules
  "eslint.rules.customizations": [
    { "rule": "*", "fixable": true, "severity": "off" }
  ]
}
```