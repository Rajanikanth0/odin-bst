import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

import eslintConfigPrettier from "eslint-config-prettier";
import jestPlugin from "eslint-plugin-jest";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser }
  },
  {
    files: ["**/*.test.{js,mjs,cjs}"],
    plugins: { jest: jestPlugin },
    rules: { ...jestPlugin.configs.recommended.rules },
    languageOptions: { globals: globals.jest },
  },
  eslintConfigPrettier
]);
