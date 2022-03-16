import fs from 'fs'
import path from 'path'
import { build as esbuild } from 'esbuild'
import { PROJECT_ROOT_PATH, LIB_CONFIG_FILE_NAME } from './constant'
import { LibundlerConfig } from './interface'
import { loadProjectFile } from './utils'
import { logger } from './logger'

interface NodeModuleWithCompile extends NodeModule {
  _compile(code: string, filename: string): any
}

export const dynamicImport = new Function('file', 'return import(file)')
async function loadConfigFromBundledFile(
  fileName: string,
  bundledCode: string
): Promise<LibundlerConfig> {
  const extension = path.extname(fileName)
  const defaultLoader = require.extensions[extension]!
  require.extensions[extension] = (module: NodeModule, filename: string) => {
    if (filename === fileName) {
      ;(module as NodeModuleWithCompile)._compile(bundledCode, filename)
    } else {
      defaultLoader(module, filename)
    }
  }
  // clear cache in case of server restart
  delete require.cache[require.resolve(fileName)]
  const raw = require(fileName)
  const config = raw.__esModule ? raw.default : raw
  require.extensions[extension] = defaultLoader
  return config
}

// https://github.com/vitejs/vite/blob/main/packages/vite/src/node/config.ts
async function bundleConfigFile(fileName: string, isESM = false): Promise<string> {
  const result = await esbuild({
    absWorkingDir: process.cwd(),
    entryPoints: [fileName],
    outfile: 'out.js',
    write: false,
    platform: 'node',
    bundle: true,
    format: isESM ? 'esm' : 'cjs',
    sourcemap: 'inline',
    metafile: true,
    plugins: [
      {
        name: 'externalize-deps',
        setup(build) {
          build.onResolve({ filter: /.*/ }, (args) => {
            const id = args.path
            if (id[0] !== '.' && !path.isAbsolute(id)) {
              return {
                external: true,
              }
            }
          })
        },
      },
      {
        name: 'replace-import-meta',
        setup(build) {
          build.onLoad({ filter: /\.[jt]s$/ }, async (args) => {
            const contents = await fs.promises.readFile(args.path, 'utf8')
            return {
              loader: args.path.endsWith('.ts') ? 'ts' : 'js',
              contents: contents
                .replace(/\bimport\.meta\.url\b/g, JSON.stringify(`file://${args.path}`))
                .replace(/\b__dirname\b/g, JSON.stringify(path.dirname(args.path)))
                .replace(/\b__filename\b/g, JSON.stringify(args.path)),
            }
          })
        },
      },
    ],
  })
  return result.outputFiles[0].text
}

export async function loadUserConfig(): Promise<LibundlerConfig | null> {
  let resolvedPath: string | undefined
  let isTS = false
  let isESM = false

  // check package.json for type: "module" and set `isMjs` to true
  const pkg = loadProjectFile('package.json', true)
  if (pkg && pkg.type === 'module') {
    isESM = true
  }

  // implicit config file loaded from inline root (if present)
  // otherwise from cwd
  const jsconfigFile = path.resolve(PROJECT_ROOT_PATH, `${LIB_CONFIG_FILE_NAME}.js`)
  if (fs.existsSync(jsconfigFile)) {
    resolvedPath = jsconfigFile
  }

  if (!resolvedPath) {
    const mjsconfigFile = path.resolve(PROJECT_ROOT_PATH, `${LIB_CONFIG_FILE_NAME}.mjs`)
    if (fs.existsSync(mjsconfigFile)) {
      resolvedPath = mjsconfigFile
      isESM = true
    }
  }

  if (!resolvedPath) {
    const tsconfigFile = path.resolve(PROJECT_ROOT_PATH, `${LIB_CONFIG_FILE_NAME}.ts`)
    if (fs.existsSync(tsconfigFile)) {
      resolvedPath = tsconfigFile
      isTS = true
    }
  }

  if (!resolvedPath) {
    const cjsConfigFile = path.resolve(PROJECT_ROOT_PATH, `${LIB_CONFIG_FILE_NAME}.cjs`)
    if (fs.existsSync(cjsConfigFile)) {
      resolvedPath = cjsConfigFile
      isESM = false
    }
  }

  if (!resolvedPath) {
    logger.debug('No config file found.')
    return null
  }

  try {
    let userConfig: LibundlerConfig | null = null

    if (isESM) {
      const fileUrl = require('url').pathToFileURL(resolvedPath)
      const bundled = await bundleConfigFile(resolvedPath, true)
      if (isTS) {
        // before we can register loaders without requiring users to run node
        // with --experimental-loader themselves, we have to do a hack here:
        // bundle the config file w/ ts transforms first, write it to disk,
        // load it with native Node ESM, then delete the file.
        fs.writeFileSync(resolvedPath + '.js', bundled)
        userConfig = (await dynamicImport(`${fileUrl}.js?t=${Date.now()}`)).default
        fs.unlinkSync(resolvedPath + '.js')
      } else {
        // using Function to avoid this from being compiled away by TS/Rollup
        // append a query so that we force reload fresh config in case of
        // server restart
        userConfig = (await dynamicImport(`${fileUrl}?t=${Date.now()}`)).default
      }
    }

    if (!userConfig) {
      // Bundle config file and transpile it to cjs using esbuild.
      const bundled = await bundleConfigFile(resolvedPath)
      userConfig = await loadConfigFromBundledFile(resolvedPath, bundled)
    }

    return userConfig
  } catch (error) {
    logger.error(`Failed to load config from ${resolvedPath}`)
    process.exit(1)
  }
}
