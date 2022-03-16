import path from 'path'
import process from 'process'

export const PROJECT_ROOT_PATH = process.cwd()

export const LIB_NAME = 'libundler'
export const LIB_CONFIG_FILE_NAME = 'libundler.config'
export const LIB_PACKAGE_JSON = require(path.resolve(__dirname, '..', 'package.json'))

export type TargetModuleType = 'umd' | 'cjs' | 'esm'
export const enum TargetModuleEnum {
  UMD = 'umd',
  CJS = 'cjs',
  ESM = 'esm',
}

export type ParserType = 'babel' | 'buble'
export const enum ParserEnum {
  Babel = 'babel',
  Buble = 'buble',
}
