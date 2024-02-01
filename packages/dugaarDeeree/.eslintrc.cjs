/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: ['common'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: 'tsconfig.json',
  },
}
