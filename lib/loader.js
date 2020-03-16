
const fs = require('fs')
const consola = require('consola')
const { FILE, LOG_TITLE } = require('./constants')

exports.loadCustomConfig = (cwd = process.cwd()) => {
  const configPath = `${cwd}/${FILE.CONFIG}`

  if (fs.existsSync(configPath)) {
    return require(configPath)
  } else {
    consola.warn(`${LOG_TITLE}: Not found ${FILE.CONFIG} file.`)
    return {}
  }
}

exports.loadPackageJson = (cwd = process.cwd()) => {
  const packagePath = `${cwd}/${FILE.PACKAGE}`

  if (fs.existsSync(packagePath)) {
    return require(packagePath)
  } else {
    consola.warn(`${LOG_TITLE}: Not found ${FILE.PACKAGE} file.`)
    return {}
  }
}

