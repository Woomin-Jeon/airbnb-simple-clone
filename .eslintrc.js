module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'object-curly-newline': 'off',
    'no-param-reassign': 'off',
    'no-alert': 'off',
    'import/extensions': 'off',
    'no-use-before-define': 'off',
  },
};
