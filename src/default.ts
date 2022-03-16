import { TargetModuleEnum, ParserEnum } from './constant'
import { LibundlerConfigObject } from './interface'
import { getDefaultBanner } from './banner'
import { pascalify, kebabcase, loadProjectFile } from './utils'

const PACKAGE_NAME = Object.freeze({
  TypeScript: 'typescript',
  React: 'react',
  ESLint: 'eslint',
})

export const getDefaultConfig = (): Partial<LibundlerConfigObject> => {
  type PackageValue = string | undefined
  const packageJSON = loadProjectFile('package.json', true)
  const packageName: PackageValue = packageJSON.name && pascalify(packageJSON.name)
  const packageVersion: PackageValue = packageJSON.version

  const allDependencies = {
    ...packageJSON.dependencies,
    ...packageJSON.devDependencies,
    ...packageJSON.peerDependencies,
  }
  const depNames = Object.keys(packageJSON.dependencies || {})
  const devDepNames = Object.keys(packageJSON.devDependencies || {})
  // const peerDepNames = Object.keys(packageJSON.peerDependencies || {})

  const isEnabledTS = [...depNames, ...devDepNames].includes(PACKAGE_NAME.TypeScript)
  const isEnabledESLint = Boolean(allDependencies[PACKAGE_NAME.ESLint])
  // const isEnabledReact = Boolean(allDependencies[PACKAGE_NAME.React])

  const banner = getDefaultBanner({
    name: packageName,
    version: packageVersion,
    license: packageJSON.license,
    author: packageJSON.author?.name || packageJSON.author,
    authorURL: packageJSON.author?.url,
  })

  const extensions = ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json', '.node']

  const defaultConfig: Partial<LibundlerConfigObject> = {
    entry: `src/index.${isEnabledTS ? 'ts' : 'js'}`,
    outDir: 'dist',
    banner,
    sourcemap: true,
    targets: [TargetModuleEnum.ESM, TargetModuleEnum.UMD, TargetModuleEnum.CJS],
    exports: 'auto',
    commonjs: {
      // https://github.com/rollup/plugins/tree/master/packages/node-resolve#extensions
      extensions,
    },
    nodeResolve: {
      // https://github.com/rollup/plugins/tree/master/packages/node-resolve#extensions
      extensions,
    },
    alias: {},
    replace: {
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify('production'),
    },
    external: [],
    globals: {},
    parser: ParserEnum.Buble,
    parserOptions: {},
    postcss: {},
    eslint: isEnabledESLint ? {} : false,
    typescript: isEnabledTS ? {} : false,
    minimize: true,
    visualizer: false,
    verbose: false,
  }

  // name
  if (packageName) {
    defaultConfig.libName = packageName
    defaultConfig.outFileName = kebabcase(packageName)
  }

  // version
  if (packageVersion) {
    defaultConfig.replace!['PACKAGE_VERSION'] = packageVersion
  }

  return defaultConfig
}
