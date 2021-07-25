/** @type {import('../../lib/interface').LibundlerConfigObject} */
module.exports = {
  libName: 'rc',
  outFileName: 'rc',
  entry: './src/index.tsx',
  outDir: './dist',
  external: ['react', 'react-dom'],
  globals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
}
