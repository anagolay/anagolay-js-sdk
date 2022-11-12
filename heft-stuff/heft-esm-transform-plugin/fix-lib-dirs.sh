#!/usr/bin/env bash
# set -ex

PROJECT_ROOT=$(git rev-parse --show-toplevel)

PKG_MODULE=$PROJECT_ROOT/heft-stuff/heft-esm-transform-plugin/config/package.json/module.json
PKG_CJS=$PROJECT_ROOT/heft-stuff/heft-esm-transform-plugin/config/package.json/commonjs.json

cp "$PKG_MODULE" "$PROJECT_ROOT/heft-stuff/heft-esm-transform-plugin/lib/package.json"
cp "$PKG_CJS" "$PROJECT_ROOT/heft-stuff/heft-esm-transform-plugin/lib-commonjs/package.json"

cd lib-commonjs || exit

node cli.js
