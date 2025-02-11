module.exports = {
  extends: ["plugin:compat/recommended"],
  env: {
    browser: false,
    node: false
  },
  settings: {
    polyfills: [
      "Promise",
      "Array.from",
      "TextEncoder",
      "Object.assign"
    ]
  },
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020
  },
  rules: {
    "node/no-unsupported-features/es-syntax": 0,
    "@typescript-eslint/no-unused-vars": [
      "error", 
      { 
        argsIgnorePattern: "^_"
      }
    ],
    "no-unused-vars": [
      "error", 
      { 
        argsIgnorePattern: "^_"
      }
    ]
  }
}
