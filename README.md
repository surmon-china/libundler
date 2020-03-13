# vue-component-bundler

> Vue SFC bundler, by Rollup.

### Use

```bash
yarn add vue-component-bundler --dev
```

```js
// package.json
"scripts": {
  "build": "vcb"
}
```

```bash
yarn build
```

### Custom config

Create `vcb.config.js` in project root.

```ts
interface Config {
  entry: string // 'src/index.js',
  target?: string[] // ['umd', 'esm'],
  outDir?: string // 'dist',
  parser?: string // 'buble'
  eslint?: false | { // {}
    /* rollup-plugin-eslint config */
  }
  typescript?: false | { // false
    /* rollup-plugin-typescript2 config */
  }
  banner?: string // default:
  `
  /**
   * @file ${pack.name} v${pack.version}
   * @copyright Copyright (c) ${pack.author.name}. All rights reserved.
   * @license Released under the ${pack.license} License.
   * @author ${pack.author.name} <${pack.author.url}>
   */
  `
  minisize?: boolean // true
}
```
