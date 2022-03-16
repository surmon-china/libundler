import { rollup, RollupOptions, OutputOptions } from 'rollup'
import { LibundlerConfig, LibundlerConfigObject } from './interface'
import { getDefaultConfig } from './default'
import { configToRollupConfig } from './config'
import { logger, br, dir, yellow } from './logger'

export * from './interface'
export { configToRollupConfig } from './config'

export const bundle = (bundlerConfig?: LibundlerConfig) => {
  // config
  const defaultConfig: Partial<LibundlerConfigObject> = getDefaultConfig()
  let rollupConfig: RollupOptions | Array<RollupOptions> | null = null

  /** !bundlerConfig > use default config */
  if (!bundlerConfig) {
    if (!defaultConfig.libName) {
      logger.error(`Invalid name of package.json`)
      process.exit(1)
    } else {
      rollupConfig = configToRollupConfig(defaultConfig as any)
    }
  }

  // function config > function(defaultRollupConfig)
  if (typeof bundlerConfig === 'function') {
    rollupConfig = bundlerConfig(configToRollupConfig(defaultConfig as any))
  }

  // array
  if (Array.isArray(bundlerConfig)) {
    rollupConfig = bundlerConfig.map((item) => {
      return configToRollupConfig({ ...defaultConfig, ...item })
    })
  }

  // simple config
  const libundlerConfig = {
    ...defaultConfig,
    ...bundlerConfig,
  } as LibundlerConfigObject
  rollupConfig = configToRollupConfig(libundlerConfig)

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
    const bundle = await rollup(options)
    if (!options.output) {
      return null
    }

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

    // write item or list
    if (Array.isArray(options.output)) {
      return Promise.all(options.output.map(write))
    } else {
      return write(options.output)
    }
  }

  return (
    Array.isArray(rollupConfig)
      ? Promise.all(rollupConfig.map(doBundle))
      : doBundle(rollupConfig)
  )
    .then((result) => {
      br()
      logger.success(`${bundlePrefix} bundle done!`)
      return result
    })
    .catch((error) => {
      br()
      logger.error(`bundle error!`, error)
      throw error
    })
}
