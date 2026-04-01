import type { Options } from "../option";
import type { LinterConfig } from "../utils";
import { interopDefault } from "../utils";

export function tailwindCSSConfig({ tailwindCSS }: Required<Options>) {
  if (!tailwindCSS)
    return;
  process.env.TAILWIND_MODE = "build";

  return async () => {
    const tailwind = await interopDefault(import("eslint-plugin-better-tailwindcss"));
    return [
      {
        name: "tailwindcss/setup",
        plugins: {
          "better-tailwindcss": tailwind,
        },
        rules: {
          ...tailwind.configs["recommended-warn"].rules,
          ...tailwind.configs["recommended-error"].rules,

          "better-tailwindcss/no-unknown-classes": [
            "error",
            {
              ignore: ["image-shine", "gradient-line"],
            },
          ],
        },
      },
      typeof tailwindCSS === "object" && !tailwindCSS.order && {
        rules: {
          "better-tailwindcss/enforce-consistent-line-wrapping": "off",
          "better-tailwindcss/enforce-consistent-class-order": "off",
          "better-tailwindcss/no-duplicate-classes": "off",

        },
      },
    ] as LinterConfig[];
  };
}
