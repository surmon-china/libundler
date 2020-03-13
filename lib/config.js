
const fs = require('fs')
const vue = require('rollup-plugin-vue')
const alias = require('@rollup/plugin-alias')
const commonjs = require('@rollup/plugin-commonjs')
const json = require('@rollup/plugin-json')
const replace = require('@rollup/plugin-replace')
const postcss = require('rollup-plugin-postcss')
const typescript = require('rollup-plugin-typescript2')
const buble = require('rollup-plugin-buble')
const { terser } = require('rollup-plugin-terser')
const { eslint } = require('rollup-plugin-eslint')
const minimist = require('minimist')
const CleanCSS = require('clean-css')
const { TARGET, PARSER } = require('./constants')

module.exports = config => {
  return {
    input: config.entry,
    external: config.external,
    output: [
      config.targets.includes(TARGET.ESM) && {
        banner: config.banner,
        file: `${config.outDir}/${config.fileName}.esm.js`,
        format: 'esm',
        exports: 'named',
      },
      config.targets.includes(TARGET.UMD) && {
        banner: config.banner,
        compact: true,
        name: config.name,
        file: `${config.outDir}/${config.fileName}.js`,
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
          resolve: config.resolve
        }),
      ],
      json(),
      config.eslint && eslint(config.eslint),
      commonjs(),
      config.typescript && typescript(config.typescript),
      postcss({
        extract: true,
        minimize: config.minisize,
        extensions: ['.css', '.styl', '.sass', '.scss', 'less'],
        namedExports(name) {
          // return config.fileName
          return name
        }
      }),
      vue({
        css: false,
        template: {
          isProduction: true,
        }
      }),
      config.parser === PARSER.BUBLE && buble(),
      config.minisize && terser({
        output: {
          ecma: 5
        }
      })
    ]
  }
}
