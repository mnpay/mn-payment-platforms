/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: ['common'],
  parserOptions: {
    project: 'tsconfig.json',
  },
  ignorePatterns: ['tsconfig.json', 'packages'],
}
