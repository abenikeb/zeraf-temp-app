module.exports = {
  plugins: ['prettier'],
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'prettier', 'prettier/@typescript-eslint'],
};
