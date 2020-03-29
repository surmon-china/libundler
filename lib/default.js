const { TARGET, PARSER } = require('./constants')
const { loadPackageJson, loadESlintConfig } = require('./loader')
const { pascalify, kebabcase } = require('./utils')

const eslintConfig = loadESlintConfig()
const packageJson = loadPackageJson()
const PROJECT_NAME = pascalify(packageJson.name)
const PROJECT_FILE_NAME = kebabcase(PROJECT_NAME)

const dependencies = Object.keys(packageJson.dependencies || [])
const devDependencies = Object.keys(packageJson.devDependencies || [])
const peerDependencies = Object.keys(packageJson.peerDependencies || [])

const PACKAGE_NAME = {
  TYPESCRIPT: 'typescript',
  VUE: 'vue'
}

const banner = `
/*!
 * ${packageJson.name} v${packageJson.version}
 * Copyright (c) ${packageJson.author.name}. All rights reserved.
 * Released under the ${packageJson.license} License.
 * ${packageJson.author.name} <${packageJson.author.url}>
 */
`

module.exports = {
  banner,
  name: PROJECT_NAME,
  fileName: PROJECT_FILE_NAME,
  entry: 'src/index.js',
  outDir: 'dist',
  exports: 'auto',
  parser: PARSER.BUBLE,
  targets: [TARGET.ESM, TARGET.UMD, TARGET.CJS],
  resolve: ['.mjs', '.js', '.jsx', '.json', '.ts', '.tsx'],
  replace: {
    PACKAGE_VERSION: packageJson.version,
    'process.env.NODE_ENV': JSON.stringify('production')
  },
  vue: [
    ...dependencies,
    ...devDependencies,
    ...peerDependencies
  ].includes(PACKAGE_NAME.VUE) && {
    css: false,
    template: {
      isProduction: true,
    }
  },
  eslint: eslintConfig ? {} : false,
  typescript: [
    ...dependencies,
    ...devDependencies
  ].includes(PACKAGE_NAME.TYPESCRIPT)
    ? { useTsconfigDeclarationDir: true }
    : false,
  minimize: true,
  external: [],
  globals: {},
}
