const consola = require('consola')
const getRollupConfigByConfig = require('./config')
const defaultConfig = require('./default')
const customConfig = require('./loader').loadCustomConfig()
const { LIB_NAME } = require('./constants')

let rollupConfig = null

if (typeof customConfig === 'function') {
  rollupConfig = customConfig(getRollupConfigByConfig(defaultConfig))
} else if (Array.isArray(customConfig)) {
  rollupConfig = customConfig.map(item => getRollupConfigByConfig({ ...defaultConfig, ...item }))
} else {
  rollupConfig = getRollupConfigByConfig({ ...defaultConfig, ...customConfig })
}

consola.info(`${LIB_NAME}: the rollup config ↓\n`)
// JSON
// consola.log(JSON.stringify(rollupConfig, null, 2))
// Object
console.dir(rollupConfig, { depth: null, colors: true, customInspect: 2 })

module.exports = rollupConfig
