#!/usr/bin/env bash

# rm -rf ./dist && mkdir ./dist
cross-env NODE_ENV=production rollup --config ../core/config.js
