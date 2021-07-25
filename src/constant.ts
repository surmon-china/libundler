import path from 'path'

export const LIB_NAME = 'libundler'
export const LIB_CONFIG_FILE_NAME = 'libundler.config.js'
export const LIB_PACKAGE_JSON = require(path.resolve(__dirname, '..', 'package.json'))

export const enum TargetBundleModuleType {
  UMD = 'umd',
  CJS = 'cjs',
  ESM = 'esm',
}

export const enum RollupParserType {
  Babel = 'babel',
  Buble = 'buble',
}
