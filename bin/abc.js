#!/usr/bin/env node

const path = require('path')
const consola = require('consola')
const child_process = require('child_process')
const { COMMAND, LOG_TITLE } = require('../lib/constants')
const [commandName, ...commandParams] = process.argv.slice(2)

const run = (command, params) => {
  if (command) {
    consola.info(`${LOG_TITLE}: ${command} ${params.join(' ')}`)
    child_process.execFileSync(process.platform === 'win32' ? command + '.cmd' : command, params, { stdio: 'inherit' })
  }
}

if (!commandName || commandName === COMMAND.BUILD) {
  const configFilePath = path.resolve(__dirname, '..', 'lib', 'rollup.js')
  run('rollup', ['--config', configFilePath])
  return
}

if (commandName === COMMAND.LINT) {
  run('eslint', commandParams)
  return
}

if (commandName === COMMAND.TEST) {
  run('jest', commandParams)
}
