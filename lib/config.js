const path = require('path')
const vue = require('rollup-plugin-vue')
const alias = require('@rollup/plugin-alias')
const commonjs = require('@rollup/plugin-commonjs')
const json = require('@rollup/plugin-json')
const replace = require('@rollup/plugin-replace')
const postcss = require('rollup-plugin-postcss')
const typescript = require('rollup-plugin-typescript2')
const buble = require('rollup-plugin-buble')
const babel = require('rollup-plugin-babel')
const { terser } = require('rollup-plugin-terser')
const { eslint } = require('rollup-plugin-eslint')
const { TARGET, PARSER } = require('./constants')

module.exports = config => {
  const rollupConfig = {
    input: config.entry,
    external: config.external,
    output: [],
    plugins: []
  }

  /* -------------------------------------------- */
  /// Outputs:
  if (config.targets.includes(TARGET.ESM)) {
    rollupConfig.output.push({
      banner: config.banner,
      file: path.resolve(config.outDir, `${config.fileName}.esm.js`),
      format: 'esm',
      // https://www.rollupjs.com/guide/big-list-of-options/#%E6%A0%B8%E5%BF%83%E5%8A%9F%E8%83%BDcore-functionality
      exports: config.exports
    })
  }
  if (config.targets.includes(TARGET.CJS)) {
    rollupConfig.output.push({
      banner: config.banner,
      compact: true,
      name: config.name,
      file: path.resolve(config.outDir, `${config.fileName}.cjs.js`),
      format: 'cjs',
      exports: config.exports,
      globals: config.globals
    })
  }
  if (config.targets.includes(TARGET.UMD)) {
    rollupConfig.output.push({
      banner: config.banner,
      compact: true,
      name: config.name,
      file: path.resolve(config.outDir, `${config.fileName}.js`),
      format: 'umd',
      exports: config.exports,
      globals: config.globals
    })
  }

  /* -------------------------------------------- */
  /// Plugins:

  // before configs
  rollupConfig.plugins.push([
    replace({
      VERSION: JSON.stringify(config.version),
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    alias({
      resolve: config.resolve
    })
  ])

  // JSON
  rollupConfig.plugins.push(
    json()
  )

  // ESlint
  if (config.eslint) {
    rollupConfig.plugins.push(
      // https://github.com/TrySound/rollup-plugin-eslint#options
      eslint(config.eslint)
    )
  }

  // commonjs
  rollupConfig.plugins.push(
    commonjs()
  )

  // TypeScript
  if (config.typescript) {
    rollupConfig.plugins.push(
      typescript(config.typescript)
    )
  }

  // postcss
  rollupConfig.plugins.push(
    postcss({
      extract: true,
      minimize: config.minimize,
      extensions: ['.css', '.styl', '.sass', '.scss', 'less'],
      namedExports(name) {
        // return config.fileName
        return name
      }
    })
  )

  // Vue
  if (config.vue) {
    rollupConfig.plugins.push(
      vue(config.vue)
    )
  }

  // parser
  if (!config.parser || config.parser === PARSER.BUBLE) {
    rollupConfig.plugins.push(
      // https://github.com/rollup/plugins/tree/master/packages/buble
      // https://buble.surge.sh/guide/
      buble(config.parserOptions || {
        // https://github.com/bublejs/buble/blob/master/src/program/types/ObjectExpression.js#L88
        objectAssign: true
      })
    )
  } else if (config.parser === PARSER.BABEL) {
    rollupConfig.plugins.push(
      // https://github.com/rollup/rollup-plugin-babel#modules
      babel(config.parserOptions || {
        exclude: 'node_modules/**',
        extensions: config.resolve,
        babelrc: false,
        // https://www.babeljs.cn/docs/babel-preset-env
        presets: ['@babel/preset-env']
      })
    )
  }

  // minimize
  if (config.minimize) {
    rollupConfig.plugins.push(
      // https://github.com/TrySound/rollup-plugin-terser
      terser({
        output: {
          ecma: 5
        }
      })
    )
  }

  return rollupConfig
}
