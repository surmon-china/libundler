import fs from 'fs'
import path from 'path'
import process from 'process'
import { logger } from './logger'

export const loadProjectFile = (filePath: string, strict = false) => {
  const target = path.resolve(process.cwd(), filePath)
  if (fs.existsSync(target)) {
    return require(target)
  } else if (strict) {
    logger.warn(`File not found ${target}`)
  }
  return null
}

// Helpers for creating kebab-case/PascalCase versions of string
// Form from: https://github.com/team-innovation/vue-sfc-rollup/blob/master/lib/helpers.js
export const pascalify = (text: string) => {
  const camelized = text.replace(/-([a-z0-9])/g, (c) => c[1].toUpperCase())
  return camelized.charAt(0).toUpperCase() + camelized.slice(1)
}

export const kebabcase = (text: string) => {
  return text
    .replace(/([a-z])([A-Z0-9])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase()
}
