import { Config } from "tailwindcss";
import tailwindConfig from "@sve/tailwind-config";

export default {
  content: ["src/**/*.{ts,tsx}", "../../packages/ui/components/**/*.{ts,tsx}"],
  presets: [tailwindConfig],
} satisfies Config;
