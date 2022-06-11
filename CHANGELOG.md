# Changelog

All notable changes to this project will be documented in this file.

### 2.3.0 (2022-06-12)

**Bug fix**

- Fix rollup-plugin-ts [`path.charCodeAt`](https://github.com/microsoft/TypeScript/issues/47374) error

**Chore**

- Update dependencies

### 2.2.0 (2022-03-20)

**Bug fix**

- Amend `import` to `import type` in `interface.ts`
- Fix config `parserOptions` default value
- Fix TypeScript import error caused by `rollup-plugin-ts` `@rollup/plugin-typescript`

### 2.1.0 (2022-03-16)

- Add `@rollup/plugin-typescript` plugin
- Support `@rollup/plugin-json` plugin options
- Rename `minimize` to `terser`

### 2.0.0 (2022-03-16)

**Breaking Change**

- Remove Vue SFC support, move to [Vite library-mode](https://vitejs.dev/guide/build.html#library-mode)

**Feature**

- Support `.ts` `esm` `cjs` config file

**Chore**

- Add `test` script

### 1.1.1 (2021-12-05)

**Bug fix**

- Degrade chalk to 4.x. [5.x is pure ESM](https://github.com/chalk/chalk/releases/tag/v5.0.0)

### 1.1.0 (2021-12-05)

**Feature**

- Support JavaScript API

**Chore**

- Upgrade deps

### 1.0.1 (2021-07-26)

**Chore**

- Fix npm & CI config

### 1.0.0 (2021-07-24)

**BREAKING CHANGE**

- TypeScript `rollup-plugin-typescript2` to `rollup-plugin-ts`
- Remove test/lint
- Remove preset

### 0.3.3 (2020-03-29)

**Feature**

- Support @rollup/plugin-replace config

**Update**

- Add normal tsconfig
- Update default banner config
- Improve JSON config output

### 0.3.2 (2020-03-26)

**Add**

- Add `.javascript` & `.typescript` for `eslintrc` presets
- Update `preset/eslintrc/typescript`

**Update**

- Upgrade `eslint-plugin-vue` to `vue3-recommended`
- Support `Array` config with `abc.config`

### 0.3.0 (2020-03-24)

**Breaking change**

- Rename option `minisize` to `minimize`

**Feature**

- Provide `vue` option
- Provide `exports` option
- Update Eslint default value from `false` to `auto`
- Update Babel default value with `presets: ['@babel/preset-env']`
- Update buble default value to `{ objectAssign: true }`

**Feature**

- Rename to abc-factory
- Support (test) jest & lint (eslint)
- Support `cjs` module
- Support `babel` parser
- Provide preset configs (eslintrc/tsconfig/jest-config)

### v0.1.0

**Feature**

- Support postcss
- Support TypeScript
- Support ESlint
- Support custom base config
