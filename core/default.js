
import fs from 'fs'
import vue from 'rollup-plugin-vue'
import alias from '@rollup/plugin-alias'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import replace from '@rollup/plugin-replace'
import css from 'rollup-plugin-css-only'
import postcss from 'rollup-plugin-postcss'
import typescript from 'rollup-plugin-typescript2'
import buble from 'rollup-plugin-buble'
import { terser } from 'rollup-plugin-terser'
import { eslint } from 'rollup-plugin-eslint'
import minimist from 'minimist'
import CleanCSS from 'clean-css'
import { pascalify, kebabcase } from './utils'

// Custom config
const config = {
  input: 'src/index.ts',
  outputDir: 'dist',
  // Refer to https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency
  external: [
    // list external dependencies, exactly the way it is written in the import statement.
    'swiper',
    'vue',
  ],
  // Refer to https://rollupjs.org/guide/en#output-globals for details
  globals: {
    // Provide global variable names to replace your external imports
    swiper: 'Swiper',
    vue: 'Vue',
  }
}

const pack = require('../package.json')
const argv = minimist(process.argv.slice(2))
const isProd = process.env.NODE_ENV === 'production'
const notMoudle = !argv.format
const isOnlyESMoudle = !notMoudle && argv.format === 'es'
const isOnlyUMDModule = !notMoudle && argv.format === 'umd'

const PROJECT_NAME = pascalify(pack.name)
const PROJECT_FILE_NAME = kebabcase(PROJECT_NAME)

const banner = `
/**
 * @file ${pack.name} v${pack.version}
 * @copyright Copyright (c) ${pack.author.name}. All rights reserved.
 * @license Released under the ${pack.license} License.
 * @author ${pack.author.name} <${pack.author.url}>
 */
`

const getFileNameByFormat = (format = '') => {
  return `${config.outputDir}/${PROJECT_FILE_NAME}${format && '.' + format}.js`
}

export default {
  input: 'src/index.ts',
  external: config.outputDir,
  output: [
    (notMoudle || isOnlyESMoudle) && {
      banner,
      file: pack.module || getFileNameByFormat('esm'),
      format: 'esm',
      exports: 'named',
    },
    (notMoudle || isOnlyUMDModule) && {
      banner,
      compact: true,
      name: PROJECT_NAME,
      file: pack.main || getFileNameByFormat(),
      format: 'umd',
      exports: 'named',
      globals: config.globals
    }
  ],
  plugins: [
    [
      replace({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      alias({
        resolve: ['.mjs', '.js', '.jsx', '.json', '.vue', '.ts']
      }),
    ],
    json(),
    eslint(),
    commonjs(),
    typescript({
      useTsconfigDeclarationDir: true
    }),
    vue({
      css: false,
      template: {
        isProduction: true,
      }
    }),
    postcss({
      extensions: ['.css', '.styl', '.sass', '.scss'],
    }),
    css({
      output(style) {
        fs.writeFileSync(
          `${config.outputDir}/${PROJECT_FILE_NAME}.css`,
          new CleanCSS().minify(style).styles
        )
      }
    }),
    buble(),
    // isProd && terser({
    //   output: {
    //     ecma: 5,
    //   },
    // })
  ],
}
