# libundler

[![GitHub stars](https://img.shields.io/github/stars/surmon-china/libundler.svg?style=for-the-badge)](https://github.com/surmon-china/libundler/stargazers)
[![npm](https://img.shields.io/npm/v/@surmon-china/libundler?color=c7343a&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@surmon-china/libundler)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/surmon-china/libundler?color=1074e7&label=GPR&style=for-the-badge)](https://github.com/surmon-china/libundler/packages/156005)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/surmon-china/libundler/Publish?label=publish&style=for-the-badge)](https://github.com/surmon-china/libundler/actions?query=workflow%3APublish)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=for-the-badge)](https://github.com/surmon-china/libundler/blob/master/LICENSE)

📦 JavaScript universal library bundler, by Rollup.

🏭 通用的 JavaScript 库打包工具，零配置、开箱即用。

---

### Usage

**1. install**

```bash
yarn add libundler --dev
```

**2. add `build` script to `package.json`**

```json
"scripts": {
  "build": "libundler",
  // or
  "build": "bundle",
  // or
  "build": "b",
}
```

**3. run build**

```bash
yarn build
```

---

### Config

> Create `libundler.config.js` in project root. More detail interface is [here](https://github.com/surmon-china/libundler/blob/master/lib/default.js).

`libundler.config.js` type:

- `LibundlerConfigObject`
- `LibundlerConfigObject[]`
- `(defaultRollupConfig) => RollupConfog`

**config object example**

```ts
/** @type {import('@surmon-china/libundler/lib/interface').LibundlerConfigObject} */
module.exports = {
  entry: 'src/index.ts',
  fileName: 'library',
  targets: ['umd', 'esm'],
  minimize: false,
  external: ['vue'],
  globals: {
    vue: 'Vue',
  },
  typescript: {
    tsconfigOverride: {
      compilerOptions: {
        declaration: false,
      },
    },
  },
}
```

**config array example**

```ts
/** @type {import('@surmon-china/libundler/lib/interface').LibundlerConfigArray} */
module.exports = [
  {
    entry: 'src/index.ts',
    // ...
  },
  {
    entry: 'src/entry.ts',
    // ...
  },
]
```

**config function example**

```ts
/** @type {import('@surmon-china/libundler/lib/interface').LibundlerConfigFn} */
module.exports = (rollupConfig): RollupConfig => {
  // overwrite the Rollup config
  rollupConfig.plugins.push(/* ... */)
  // ...
  return rollupConfig
}
```
