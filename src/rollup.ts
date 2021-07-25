import { rollup, RollupOptions, OutputOptions } from 'rollup'
import { LibundlerConfig, LibundlerConfigObject } from './interface'
import { LIB_CONFIG_FILE_NAME } from './constant'
import { getDefaultConfig } from './config.default'
import { normalizeRollupConfig } from './config.normalize'
import { logger, br, dir, yellow } from './logger'
import { loadProjectFile } from './utils'

export const runRollup = () => {
  // config
  const defaultConfig: Partial<LibundlerConfigObject> = getDefaultConfig()
  const bundlerConfig: LibundlerConfig = loadProjectFile(LIB_CONFIG_FILE_NAME)
  let rollupConfig: RollupOptions | Array<RollupOptions> | null = null

  /** !bundlerConfig > use default config */
  if (!bundlerConfig) {
    if (!defaultConfig.libName) {
      logger.error(`Invalid name of package.json`)
      process.exit(1)
    } else {
      rollupConfig = normalizeRollupConfig(defaultConfig as any)
    }
  }

  // function config > function(defaultRollupConfig)
  if (typeof bundlerConfig === 'function') {
    rollupConfig = bundlerConfig(normalizeRollupConfig(defaultConfig as any))
  }

  // array
  if (Array.isArray(bundlerConfig)) {
    rollupConfig = bundlerConfig.map((item) => {
      return normalizeRollupConfig({ ...defaultConfig, ...item })
    })
  }

  // simple config
  const libundlerConfig = {
    ...defaultConfig,
    ...bundlerConfig,
  } as LibundlerConfigObject
  rollupConfig = normalizeRollupConfig(libundlerConfig)

  if (libundlerConfig.verbose) {
    // log config
    br()
    logger.log(`libundler config ↓\n`)
    dir(libundlerConfig)
    br()
    logger.log(`rollup config ↓\n`)
    dir(rollupConfig)
  }

  // log title
  const bundlePrefix = Array.isArray(rollupConfig)
    ? `${rollupConfig.length} libraries`
    : `library ${yellow(libundlerConfig.libName)}`

  // start
  logger.info(`${bundlePrefix} bundling...`)

  // rollup bundle
  const doBundle = async (options: RollupOptions) => {
    // rollup write
    const write = async (outputOptions: OutputOptions) => {
      // write the bundle to disk
      const { output } = await bundle.write(outputOptions)
      const outChunk = output[0]
      // closes the bundle
      await bundle.close()
      br()
      logger.success(`${bundlePrefix} - ${yellow(outChunk.fileName)} is bundled!`)
      if (libundlerConfig.verbose) {
        dir(outChunk)
      }
      return output
    }
    const bundle = await rollup(options)
    if (!options.output) {
      return null
    }
    if (Array.isArray(options.output)) {
      return Promise.all(options.output.map(write))
    } else {
      return write(options.output)
    }
  }

  ;(Array.isArray(rollupConfig)
    ? Promise.all(rollupConfig.map(doBundle))
    : doBundle(rollupConfig)
  )
    .then(() => {
      br()
      logger.success(`${bundlePrefix} bundle done!`)
      br()
      process.exit(0)
    })
    .catch((error) => {
      logger.error(`bundle error!`, error)
      process.exit(1)
    })
}
