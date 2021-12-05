import { program } from 'commander'
import consola from 'consola'
import { LIB_NAME, LIB_PACKAGE_JSON, LIB_CONFIG_FILE_NAME } from './constant'
import { logger, link, red } from './logger'
import { loadProjectFile } from './utils'
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
    bundle(loadProjectFile(LIB_CONFIG_FILE_NAME))
      .then(() => process.exit(0))
      .catch(() => process.exit(1))
  })

program.parse(process.argv)
