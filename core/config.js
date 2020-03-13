
const defaultConfig = require('./default')
const { loadCustomConfig } = require('./loader')

return merge(defaultConfig, loadCustomConfig())
