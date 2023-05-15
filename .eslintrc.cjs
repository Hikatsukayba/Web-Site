module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
  
    plugins: [
      '@typescript-eslint',
      'eslint-plugin-node',
    ],
  
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
    ],
  
    parserOptions: {
      "ecmaVersion": 2020
    },
  
    rules: {
      "comma-dangle": ["error", {
        "arrays": "always-multiline",
        "objects": "always-multiline",
        "imports": "always-multiline",
        "exports": "always-multiline",
        "functions": "always-multiline",
      }],
    },
  
    env: {
      es6: true,
      browser: true,
      node: true,
    },
  
    parserOptions: {
      project: './tsconfig.json',
      tsconfigRootDir: __dirname,
    },
  
    globals: {
      "global": false,
      "Promise": false,
    },
  };