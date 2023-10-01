import { Config } from "tailwindcss";
import tailwindConfig from "@sve/tailwind-config";

export default {
  content: ["components/**/*.{ts,tsx}"],
  presets: [tailwindConfig],
} satisfies Config;
