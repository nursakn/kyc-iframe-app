module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:@typescript-eslint/recommended",
    "eslint-config-prettier",
  ],
  settings: {
    "react": {
      "version": "detect"
    },
    "import/resolver": {
      "typescript": {}
      // "node": {
      //   "paths": [
      //     "src"
      //   ],
      //   "extensions": [
      //     ".js",
      //     ".jsx",
      //     ".ts",
      //     ".tsx"
      //   ]
      // }
    }
  },
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: [
    "react-refresh",
    "@typescript-eslint",
    "import"
  ],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "no-unused-vars": "off",
    "react/react-in-jsx-scope": "off",
  },
}
