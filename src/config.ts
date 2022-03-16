import path from 'path'
import { RollupOptions, OutputOptions, Plugin } from 'rollup'
import json from '@rollup/plugin-json'
import alias from '@rollup/plugin-alias'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import resolve from '@rollup/plugin-node-resolve'
import buble from '@rollup/plugin-buble'
import eslint from '@rollup/plugin-eslint'
import babel from '@rollup/plugin-babel'
import postcss from 'rollup-plugin-postcss'
import typescript from '@rollup/plugin-typescript'
import ts from 'rollup-plugin-ts'
import visualizer from 'rollup-plugin-visualizer'
import { terser } from 'rollup-plugin-terser'
import { TargetModuleEnum, ParserEnum } from './constant'
import { LibundlerConfigObject } from './interface'
import { logger } from './logger'

export const configToRollupConfig = (bundlerConfig: LibundlerConfigObject): RollupOptions => {
  const rollupOutput: OutputOptions[] = []
  const rollupPlugins: Plugin[] = []
  const rollupConfig: RollupOptions = {
    input: bundlerConfig.entry,
    external: bundlerConfig.external,
    output: rollupOutput,
    plugins: rollupPlugins,
  }

  /** output */
  if (bundlerConfig.targets!.includes(TargetModuleEnum.ESM)) {
    rollupOutput.push({
      banner: bundlerConfig.banner || void 0,
      sourcemap: bundlerConfig.sourcemap,
      file: path.resolve(bundlerConfig.outDir!, `${bundlerConfig.outFileName}.esm.js`),
      format: 'esm',
      // https://www.rollupjs.com/guide/big-list-of-options/#%E6%A0%B8%E5%BF%83%E5%8A%9F%E8%83%BDcore-functionality
      exports: bundlerConfig.exports,
    })
  }
  if (bundlerConfig.targets!.includes(TargetModuleEnum.CJS)) {
    rollupOutput.push({
      banner: bundlerConfig.banner || void 0,
      sourcemap: bundlerConfig.sourcemap,
      compact: true,
      name: bundlerConfig.libName,
      file: path.resolve(bundlerConfig.outDir!, `${bundlerConfig.outFileName}.cjs.js`),
      format: 'cjs',
      exports: bundlerConfig.exports,
      globals: bundlerConfig.globals,
    })
  }
  if (bundlerConfig.targets!.includes(TargetModuleEnum.UMD)) {
    rollupOutput.push({
      banner: bundlerConfig.banner || void 0,
      sourcemap: bundlerConfig.sourcemap,
      compact: true,
      name: bundlerConfig.libName,
      file: path.resolve(bundlerConfig.outDir!, `${bundlerConfig.outFileName}.umd.js`),
      format: 'umd',
      exports: bundlerConfig.exports,
      globals: bundlerConfig.globals,
    })
  }

  /** plugins */

  // resolve
  if (bundlerConfig.nodeResolve) {
    rollupPlugins.push(resolve(bundlerConfig.nodeResolve))
  }

  // ESlint
  if (bundlerConfig.eslint) {
    rollupPlugins.push(eslint(bundlerConfig.eslint))
  }

  // ts
  if (bundlerConfig.ts) {
    rollupPlugins.push(ts(bundlerConfig.ts))
  }

  // TypeScript
  if (bundlerConfig.typescript) {
    rollupPlugins.push(typescript(bundlerConfig.typescript))
  }

  // JSON
  rollupPlugins.push(json(bundlerConfig.json))

  // postcss
  rollupPlugins.push(
    postcss({
      extract: true,
      minimize: true,
      extensions: ['.css', '.styl', '.sass', '.scss', 'less'],
      ...bundlerConfig.postcss,
    })
  )

  // parser
  if (bundlerConfig.parser) {
    if (bundlerConfig.parser === ParserEnum.Babel) {
      rollupPlugins.push(
        babel(
          bundlerConfig.parserOptions || {
            exclude: 'node_modules/**',
            // https://www.babeljs.cn/docs/babel-preset-env
            // presets: ['@babel/preset-env'],
            // babelrc: false,
          }
        )
      )
    } else if (bundlerConfig.parser === ParserEnum.Buble) {
      rollupPlugins.push(
        // https://buble.surge.sh/guide/
        buble(
          bundlerConfig.parserOptions || {
            objectAssign: true,
          }
        )
      )
    } else {
      logger.warn(`'parser' only supports 'babel' or 'buble' types`)
    }
  }

  // commonjs
  rollupPlugins.push(commonjs(bundlerConfig.commonjs))

  // replace
  if (bundlerConfig.replace) {
    rollupPlugins.push(replace(bundlerConfig.replace))
  }

  // alias
  if (bundlerConfig.alias) {
    rollupPlugins.push(alias(bundlerConfig.alias))
  }

  // terser
  if (bundlerConfig.terser) {
    rollupPlugins.push(
      terser(
        typeof bundlerConfig.terser === 'object'
          ? bundlerConfig.terser
          : { output: { ecma: 5 } }
      )
    )
  }

  // visualizer
  if (bundlerConfig.visualizer) {
    rollupPlugins.push(
      visualizer(
        typeof bundlerConfig.visualizer === 'object'
          ? bundlerConfig.visualizer
          : {
              open: true,
            }
      )
    )
  }

  return rollupConfig
}
