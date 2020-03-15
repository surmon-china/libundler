
const { TARGET, PARSER } = require('./constants')
const { loadPackageJson } = require('./loader')
const { pascalify, kebabcase } = require('./utils')

const packageJson = loadPackageJson()
const PROJECT_NAME = pascalify(packageJson.name)
const PROJECT_FILE_NAME = kebabcase(PROJECT_NAME)

const dependencies = Object.keys(packageJson.dependencies || [])
const devDependencies = Object.keys(packageJson.devDependencies || [])

const PACKAGE_NAME = {
  TYPESCRIPT: 'typescript',
  ESLINT: 'eslint'
}

const banner = `
/**
 * @file ${packageJson.name} v${packageJson.version}
 * @copyright Copyright (c) ${packageJson.author.name}. All rights reserved.
 * @license Released under the ${packageJson.license} License.
 * @author ${packageJson.author.name} <${packageJson.author.url}>
 */
`

module.exports = {
  banner,
  name: PROJECT_NAME,
  version: JSON.stringify(packageJson.version),
  fileName: PROJECT_FILE_NAME,
  entry: 'src/index.js',
  outDir: 'dist',
  parser: PARSER.BUBLE,
  targets: [TARGET.ESM, TARGET.UMD],
  umdOutFile: `dist/${PROJECT_FILE_NAME}.js`,
  resolve: ['.mjs', '.js', '.jsx', '.json', '.ts'],
  eslint: false,
  typescript: [...dependencies, ...devDependencies].includes(PACKAGE_NAME.TYPESCRIPT)
    ? { useTsconfigDeclarationDir: true }
    : false,
  minisize: true,
  external: [],
  globals: {},
}
