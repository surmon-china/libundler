const path = require('path')
const shell = require('shelljs')

const tests = [
  'cjs-config',
  'esm-config',
  'nope-config',
  'react-jsx-scss',
  'react-tsx',
  'typescript',
]

tests.forEach((item) => {
  const dir = path.join(__dirname, item)
  console.log('test dir:', dir)
  shell.cd(dir)
  shell.exec('yarn')
  if (shell.exec('yarn build').code !== 0) {
    shell.echo(`Error: ${item} bundle failed`)
    shell.exit(1)
  }
})
