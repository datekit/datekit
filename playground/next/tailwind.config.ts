import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@datekit/react/**/*.{js,mjs}",
  ],
  safelist: [
    {
      pattern: /stone-/,
    },
    {
      pattern: /red-/,
    },
    {
      pattern: /indigo-/,
    }
  ],
  plugins: [],
};
export default config;
