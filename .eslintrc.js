module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,

    // allow async-await
    'generator-star-spacing': 'off',

    'no-mixed-spaces-and-tabs': [0],
    'no-tabs': 0,
    'skipBlankLines': 0,
    'ignoreComments': 0,
    'no-trailing-spaces': [2, { "skipBlankLines": true }],

    // allow debugger during development
    'no-debugger': 'off' // 'error' : 'off'
  },
};
