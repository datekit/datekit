import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    ".": "src/index.ts",
  },
  treeshake: true,
  format: ["cjs", "esm"],
  external: ["react"],
  dts: true,
  clean: true
});
