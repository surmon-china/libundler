import { defineConfig } from '../../lib'

export default defineConfig({
  libName: 'TsLib',
  eslint: false,
  targets: ['esm', 'cjs'],
})
