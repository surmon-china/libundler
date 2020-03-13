
const consola = require('consola')
const getRollupConfigByConfig = require('./config')
const defaultConfig = require('./default')
const customConfig = require('./loader').loadCustomConfig()
const { LIB_NAME } = require('./constants')

const rollupConfig = typeof customConfig === 'function'
  ? customConfig(getRollupConfigByConfig(defaultConfig))
  : getRollupConfigByConfig({ ...defaultConfig, ...customConfig })

consola.info(`${LIB_NAME}: the rollup config ↓\n`)
consola.log(rollupConfig)

module.exports = rollupConfig
