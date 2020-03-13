#!/usr/bin/env node

const path = require('path')
const shelljs = require('shelljs')

const configFilePath = path.resolve(__dirname, '..', 'lib', 'build.js')
shelljs.exec(`rollup --config ${configFilePath}`)
