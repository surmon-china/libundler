/** @type {import('../../lib/interface').LibundlerConfigObject} */
export default {
  entry: './src/index.jsx',
  external: ['react', 'react-dom'],
  globals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  minimize: false,
}
