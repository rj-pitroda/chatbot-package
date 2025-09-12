import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  // format: ["esm", "cjs"], //cjs needed for old project which is doing require instead of import modern project not needed if you are enable this make sure include cjs in package.json outside:"main": "dist/index.cjs", inside export "require": "./dist/index.cjs",
  format: ["esm"],
  dts: true,
  sourcemap: false,
  clean: true,
  external: ["react", "react-dom", "tailwindcss"], // ⚠️ exclude Tailwind
  minify: true,
  loader: {
    ".png": "dataurl",
    ".svg": "dataurl",
    ".txt": "text"
  }

});
