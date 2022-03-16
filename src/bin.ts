import consola from 'consola'
import { program } from 'commander'
import { LIB_NAME, LIB_PACKAGE_JSON } from './constant'
import { logger, link, red } from './logger'
import { loadUserConfig } from './loader'
import { bundle } from '.'

consola.wrapAll()

program.configureOutput({
  writeOut: (str) => logger.info(str),
  writeErr: (str) => logger.warn(str),
  outputError: (str, write) => write(red(str)),
})

program
  .name(LIB_NAME)
  .usage('[build]')
  .helpOption('-h, --help', `${link(LIB_PACKAGE_JSON.repository.url)}`)
  .version(LIB_PACKAGE_JSON.version, '-v, --version')
  .command('build', { isDefault: true })
  .description('Run bundler')
  .action(() => {
    loadUserConfig().then((config) => {
      bundle(config || void 0)
        .then(() => process.exit(0))
        .catch(() => process.exit(1))
    })
  })

program.parse(process.argv)
