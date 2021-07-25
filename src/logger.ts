import chalk from 'chalk'
import consola, { Consola } from 'consola'
import { LIB_NAME } from './constant'

type LogMethod = typeof loggerMethods[number]
type LoggerBase = Pick<Consola, LogMethod>

const loggerMethods = [
  'fatal',
  'error',
  'warn',
  'log',
  'info',
  'start',
  'success',
  'ready',
  'debug',
  'trace',
] as const

export interface Logger extends LoggerBase {
  $: Consola
}
export const logger: Logger = {
  $: consola,
  ...loggerMethods.reduce((_logger, method) => {
    return {
      ..._logger,
      [method]: (message: string | any, ...args: any[]) => {
        const target = consola[method]
        return target(`[${LIB_NAME}] ${message}`, ...args)
      },
    }
  }, {} as LoggerBase),
}

export const dir = (content: any) => {
  console.dir(content, { depth: null, colors: true, customInspect: 2 })
}

export const br = () => {
  console.log('')
}

export const clear = () => {
  process.stdout.write(
    process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H'
  )
}

export const yellow = (text: string) => chalk.yellow(text)
export const green = (text: string) => chalk.green(text)
export const blue = (text: string) => chalk.blue(text)
export const red = (text: string) => chalk.red(text)
export const link = (text: string) => chalk.cyan.underline(text)
