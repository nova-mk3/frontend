import { tailwindConfig } from "@nova/tailwind-config/tailwind.config.mjs";
import type { Config } from "tailwindcss";

export default {
  ...tailwindConfig,
} satisfies Config;
