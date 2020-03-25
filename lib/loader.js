const fs = require('fs')
const path = require('path')
const consola = require('consola')
const { FILE, LOG_TITLE } = require('./constants')

exports.loadProjectFile = filePath => {
  const target = path.resolve(process.cwd(), filePath)
  if (fs.existsSync(target)) {
    return require(target)
  } else {
    consola.warn(`${LOG_TITLE}: File not found ${target}.`)
  }
}

exports.loadCustomConfig = () => {
  return exports.loadProjectFile(FILE.CONFIG)
}

exports.loadPackageJson = () => {
  return exports.loadProjectFile(FILE.PACKAGE)
}

exports.loadESlintConfig = () => {
  let config = null
  try {
    config = require(path.resolve(process.cwd(), FILE.ESLINT))
  } catch (error) {
    config = (exports.loadPackageJson() || {}).eslintConfig
  } finally {
    return config
  }
}
