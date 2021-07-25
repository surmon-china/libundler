/** @type {import('../../lib/interface').LibundlerConfigObject} */
module.exports = {
  entry: './src/index.jsx',
  external: ['react', 'react-dom'],
  globals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
}
