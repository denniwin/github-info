module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    amd: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "simple-import-sort"],
  rules: {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
  overrides: [
    {
      files: ["*.js", "*.jsx", "*.ts", "*.tsx"],
      rules: {
        "simple-import-sort/imports": [
          "error",
          {
            groups: [
              ["^\\u0000"],
              ["^react$", "^@?\\w"],
              ["^@", "^"],
              ["^\\./"],
              ["^.+\\.(module.css|module.scss|.css|.scss)$"],
              ["^.+\\.(gif|png|svg|jpg)$"],
            ],
          },
        ],
      },
    },
  ],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "latest",
  },
};
