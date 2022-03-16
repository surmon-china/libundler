import { defineConfig } from '../../lib'

export default defineConfig({
  libName: 'rc',
  outFileName: 'rc',
  entry: './src/index.tsx',
  outDir: './dist',
  external: ['react', 'react-dom'],
  globals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
})
