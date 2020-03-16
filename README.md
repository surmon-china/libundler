# abc-factory
📦 JavaScript bundler/linter/tester, by Rollup/ESlint/Jest.

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
  name?: string // like: 'VueAwesomeSwiper'
  fileName?: string // like: 'vue-awesome-swiper'
  outDir?: string // 'dist',
  targets?: string[] // ['umd', 'esm', 'cjs'],
  parser?: string // 'buble' | 'babel'
  parserOptions?: object // {}
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

### About abc provide default configs

**[tsconfig.json - extends](https://www.typescriptlang.org/tsconfig#extends)**

```json
{
  "extends": "./node_modules/abc-factory/config/tsconfig/vue",
  // your options like:
  "compilerOptions": {
    "declaration": true,
    "declarationDir": "types",
    // ...
  },
  "exclude": [
    "node_modules",
    "dist",
    // ...
  ]
}
```

**[jest.config.js - extends](https://jestjs.io/docs/en/configuration)**

```js
const abcJestConfig = require('./node_modules/abc-factory/config/jest/vue.typescript')
module.exports = {
  ...abcJestConfig,
  testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  // ...
}
```

**[.eslintrc.js - extends](https://eslint.org/docs/user-guide/configuring#extending-configuration-files)**

```js
module.exports = {
  extends: './node_modules/abc-factory/config/eslintrc/vue.typescript',
  rules: {
    // rules...
  }
}
```

