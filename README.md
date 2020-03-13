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

Create `vcb.config.js` in project root. More detail is [here]().

```ts
// vcb.config.js can export a vcb config object or function
// vcb config object
interface Config {
  entry?: string // 'src/index.js',
  name?: string // like: 'vue-awesome-swiper' | 'VueAwesomeSwiper'
  fileName?: string // same name
  outDir?: string // 'dist',
  targets?: string[] // ['umd', 'esm'],
  parser?: string // 'buble'
  resolve?: string[] // ['.mjs', '.js', '.jsx', '.json', '.vue', '.ts'],
  eslint?: false | { // auto
    /* rollup-plugin-eslint config */
  }
  typescript?: false | { // auto
    /* rollup-plugin-typescript2 config */
  }
  minisize?: boolean // true
  banner?: string // default: TODO: link
  // Refer to https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency
  // list external dependencies, exactly the way it is written in the import statement.
  external: []
  // Refer to https://rollupjs.org/guide/en#output-globals for details
  // Provide global variable names to replace your external imports
  globals: {}
}
// function
// overwrite the default Rollup confog
function overwrite?(defaultRollupConfig): RollupConfog {
  // ...
  return RollupConfig
}
```
