# libundler

[![GitHub stars](https://img.shields.io/github/stars/surmon-china/libundler.svg?style=for-the-badge)](https://github.com/surmon-china/libundler/stargazers)
[![npm](https://img.shields.io/npm/v/@surmon-china/libundler?color=c7343a&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@surmon-china/libundler)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/surmon-china/libundler?color=1074e7&label=GPR&style=for-the-badge)](https://github.com/surmon-china/libundler/packages/913524)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/surmon-china/libundler/Publish?label=publish&style=for-the-badge)](https://github.com/surmon-china/libundler/actions?query=workflow%3APublish)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=for-the-badge)](https://github.com/surmon-china/libundler/blob/master/LICENSE)

📦 Universal JavaScript library bundler, powered by [rollup](https://github.com/rollup).

🏭 通用的 JavaScript 库打包工具，零配置、开箱即用。

---

### Usage

1. **install**

```bash
npm install @surmon-china/libundler --save-dev
```

or

```bash
yarn add @surmon-china/libundler --dev
```

2. **add `build` script to `package.json`**

```json
"scripts": {
  "build": "libundler",
}
```

or

```json
"scripts": {
  "build": "b",
}
```

3. **run build**

```bash
yarn build
```

---

### Config

By default, you do not need to specify a configuration file, libundler will generate a nearly perfect configuration for the bundle according to your `package.json`.

But if you have more specific needs, you can create `libundler.config.js` in your project root.

[**`libundler.config.js` interface**](https://github.com/surmon-china/libundler/blob/main/src/interface.ts)

- `LibundlerConfigObject`
- `LibundlerConfigObject[]`
- `(defaultRollupConfig) => RollupConfig`

**config example projects:**

- [javascript](https://github.com/surmon-china/libundler/tree/main/tests/javascript)
- [typescript](https://github.com/surmon-china/libundler/tree/main/tests/typescript)
- [react-jsx-scss](https://github.com/surmon-china/libundler/tree/main/tests/react-jsx-scss)
- [react-tsx](https://github.com/surmon-china/libundler/tree/main/tests/react-tsx)
- [vue-ts](https://github.com/surmon-china/libundler/tree/main/tests/vue-ts)

**object config example:**

```ts
// libundler.config.js

/** @type {import('@surmon-china/libundler/lib/interface').LibundlerConfigObject} */
module.exports = {
  entry: 'src/index.js',
  // ...
}
```

**array config example:**

```ts
// libundler.config.js

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

**function config example:**

```ts
// libundler.config.js

/** @type {import('@surmon-china/libundler/lib/interface').LibundlerConfigFn} */
module.exports = (rollupConfig): RollupConfig => {
  // overwrite the Rollup config
  rollupConfig.plugins.push(/* ... */)

  // ...
  return rollupConfig
}
```

### Development

```bash
yarn dev

yarn lint

yarn build

yarn release
```

### Changelog

Detailed changes for each release are documented in the [release notes](https://github.com/surmon-china/libundler/blob/main/CHANGELOG.md).

### License

[MIT](https://github.com/surmon-china/libundler/blob/main/LICENSE)
