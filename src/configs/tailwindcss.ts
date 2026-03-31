import type { Options } from "../option";
import type { LinterConfig } from "../utils";
import { interopDefault } from "../utils";

export function tailwindCSSConfig({ tailwindCSS }: Required<Options>) {
  if (!tailwindCSS)
    return;
  process.env.TAILWIND_MODE = "build";

  return async () => {
    const tailwind = await interopDefault(import ("eslint-plugin-better-tailwindcss"));
    return [
      {
        name: "tailwindcss/setup",
        plugins: {
          tailwindcss: tailwind,
        },
      },
      typeof tailwindCSS === "object" && !tailwindCSS.order && {
        rules: {
          "tailwindcss/enforce-consistent-class-order": "error",
          "tailwindcss/no-duplicate-classes": "error",
        },
      },
    ] as LinterConfig[];
  };
}
