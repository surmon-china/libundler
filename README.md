# abc-factory
📦 JavaScript bundler/lint/test, by Rollup/ESlint/Jest.

JavaScript 开发生产一条龙工具，零配置，开箱即用。

### Use

```bash
yarn add abc-factory --dev
```

**package.json**
```json
"scripts": {
  "build": "abc build",
  "lint": "abc lint --ext .ts,.vue src",
  "test": "abc test",
  "test:watch": "abc test --watch -i",
}
```

```bash
yarn build
```

### Custom config

Create `abc.config.js` in project root. More detail is [here](https://github.com/surmon-china/abc-factory/blob/master/lib/default.js).

`abc.config.js` can export a abc config object or function.

**config object**
```ts
module.exports = {
  entry?: string // 'src/index.js',
  name?: string // like: 'vue-awesome-swiper' | 'VueAwesomeSwiper'
  fileName?: string // same name
  outDir?: string // 'dist',
  targets?: string[] // ['umd', 'esm'],
  parser?: string // 'buble'
  resolve?: string[] // ['.mjs', '.js', '.jsx', '.json', '.ts'],
  eslint?: false | { // false
    /* rollup-plugin-eslint config */
  }
  typescript?: false | { // auto
    /* rollup-plugin-typescript2 config */
  }
  minisize?: boolean // true
  banner?: string // default: [link](https://github.com/surmon-china/abc-factory/blob/master/lib/default.js#L18)
  // Refer to https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency
  // list external dependencies, exactly the way it is written in the import statement.
  external: []
  // Refer to https://rollupjs.org/guide/en#output-globals for details
  // Provide global variable names to replace your external imports
  globals: {}
}
```

**config function**
```ts
// overwrite the default Rollup confog
module.exports = (defaultRollupConfig): RollupConfog => {
  // ...
  return RollupConfig
}
```
