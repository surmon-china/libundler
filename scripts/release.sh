#!/bin/sh

set -e

# https://github.com/mikeal/merge-release/blob/v4.0.7/merge-release-run.js
PKG_VERSION=$(jq -r '.version' package.json)

git fetch origin v"$PKG_VERSION" || {
  npx standard-version --skip.changelog -a --release-as "$PKG_VERSION"
  git push --follow-tags origin main
}
