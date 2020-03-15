#!/usr/bin/env node

const path = require('path')
const args = require('args')
const shelljs = require('shelljs')

console.log('args', args)

// const configFilePath = path.resolve(__dirname, '..', 'lib', 'rollup.js')
// shelljs.exec(`rollup --config ${configFilePath}`)
