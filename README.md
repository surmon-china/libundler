# abc-factory
📦 JavaScript bundler/linter/tester, by Rollup/ESlint/Jest.

JavaScript 开发生产一条龙工具，零配置，开箱即用。

### Use

```bash
# yarn add abc-factory --dev
yarn add https://github.com/surmon-china/abc-factory.git --dev --force
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

### About abc config

Create `abc.config.js` in project root. More detail is [here](https://github.com/surmon-china/abc-factory/blob/master/lib/default.js).

`abc.config.js` can export a abc config object or function.

**config object**
```ts
// abc.config.js
module.exports = {

  // entry file, default: 'src/index.js'
  entry?: string

  // lib name, default: auto get by package.json.name, like: 'VueAwesomeSwiper'
  name?: string

  // out file name, default: auto get by package.json.name, like: 'vue-awesome-swiper'
  fileName?: string

  // output dir, default: 'dist'
  outDir?: string

  // output bundle types, default: ['umd', 'esm', 'cjs']
  targets?: string[]

  // parser type, default: 'buble', options: 'buble' | 'babel'
  parser?: string
  // parser plugin options, default rollup-plugin-buble options
  parserOptions?: object // {}

  // todo file formats, default: ['.mjs', '.js', '.jsx', '.json', '.ts']
  resolve?: string[]

  // enable eslint plugin (before build), default: false
  eslint?: false | { /* rollup-plugin-eslint config */ }

  // enable typescript plugin (before build), default: auto get by package.json.dependencies
  typescript?: false | { /* rollup-plugin-typescript2 config */ }

  // mini
  minisize?: boolean // true

  // file header
  banner?: string // default: https://github.com/surmon-china/abc-factory/blob/master/lib/default.js#L18

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
// abc.config.js
module.exports = (defaultRollupConfig): RollupConfog => {
  // overwrite the default Rollup confog
  // ...
  return RollupConfig
}
```

### About abc provide default configs

**[tsconfig.json - extends](https://www.typescriptlang.org/tsconfig#extends)**

```js
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
