# libundler

[![GitHub stars](https://img.shields.io/github/stars/surmon-china/libundler.svg?style=for-the-badge)](https://github.com/surmon-china/libundler/stargazers)
&nbsp;
[![npm](https://img.shields.io/npm/v/@surmon-china/libundler?color=c7343a&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@surmon-china/libundler)
&nbsp;
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/surmon-china/libundler/Publish?label=publish&style=for-the-badge)](https://github.com/surmon-china/libundler/actions?query=workflow%3APublish)
&nbsp;
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=for-the-badge)](/LICENSE)

📦 Universal JavaScript library bundler, powered by [Rollup](https://github.com/rollup).

---

### Usage

#### 1. install

```bash
npm install @surmon-china/libundler --save-dev
```

You can also use `yarn` or `pnpm`.


#### 2. add `build` script to `package.json`

```json
"scripts": {
  "build": "libundler"
}
```

You can also use the command `b`.


#### 3. run build

```bash
yarn build
```

---

### Config

By default, you do not need to specify configuration file, libundler will generate a nearly perfect configuration for the bundle according to your `package.json`.

But if you have more specific needs, you can create `libundler.config.js` or `libundler.config.ts` in your project root.

[**libundler config interface**](/src/interface.ts)

- `LibundlerConfigObject`
- `LibundlerConfigObject[]`
- `(defaultRollupConfig) => RollupConfig`

**config example projects:**

- [javascript nope config](/tests/nope-config)
- [javascript `cjs` format config](/tests/cjs-config)
- [javascript `esm` format config](/tests/esm-config)
- [typescript](/tests/typescript)
- [react-jsx-scss](/tests/react-jsx-scss)
- [react-tsx](/tests/react-tsx)

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
module.exports = (rollupConfig) => {
  // overwrite the Rollup config
  rollupConfig.plugins.push(/* ... */)

  // ...
  return rollupConfig
}
```

**`esm` config example:**

```ts
// libundler.config.js
export default {
  entry: 'src/index.js',
  // ...
}
```

**`.ts` config example:**

```ts
// libundler.config.ts
import { defineConfig } from '@surmon-china/libundler'

export default defineConfig({
  entry: 'src/index.js',
  // ...
})
```

### JavaScript API

```js
const libundler = require('@surmon-china/libundler')

libundler
  .bundle({
    /* LibundlerConfig */
  })
  .then((result) => {
    console.log('bundle success', result)
  })
  .catch((error) => {
    console.log('bundle error', error)
  })
```

### Development

```bash
yarn dev

yarn lint

yarn build

yarn release
```

### Changelog

Detailed changes for each release are documented in the [release notes](/CHANGELOG.md).

### License

[MIT](/LICENSE)
