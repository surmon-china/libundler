
const fs = require('fs')
const merge = require('lodash/merge')

exports.loadCustomConfig = (cwd = process.cwd(), pkg, cliConfig) => {

  const defaultConfig = require('../config/vdb.config.js')({ pkg })
  const configPath = `${cwd}/vdb.config.js`

  if (fs.existsSync(configPath)) {
    let config = require(configPath)
    if (typeof config === 'function') config = config({ pkg, defaultConfig })
  } else if (pkg.dioConfig) {
    return merge(defaultConfig, pkg.dioConfig)
  } else {
    if (cliConfig.debug) console.warn('Not find vcb custom config, will use default config...')
    return defaultConfig
  }
}

exports.loadPackageJson = (cwd = process.cwd()) => {
  const pkgPath = `${cwd}/package.json`
  if (fs.existsSync(pkgPath)) {
    return require(pkgPath)
  } else {
    console.warn('未找到 package.json 文件...')
    return {}
  }
}

