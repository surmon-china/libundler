#!/usr/bin/env node

const path = require('path')
const shelljs = require('shelljs')
const { COMMAND } = require('../lib/constants')
const [commandName, ...commandParams] = process.argv.slice(2)

if (!commandName || commandName === COMMAND.BUILD) {
  const configFilePath = path.resolve(__dirname, '..', 'lib', 'rollup.js')
  shelljs.exec(`rollup --config ${configFilePath}`)
  return
}

if (commandName === COMMAND.LINT) {
  shelljs.exec(`eslint ${commandParams.join(' ')}`)
  return
}

if (commandName === COMMAND.TEST) {
  shelljs.exec(`jest ${commandParams.join(' ')}`)
  return
}
