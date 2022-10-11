#!/usr/bin/env bash
set -ex

PKG_MODULE=$GITPOD_REPO_ROOT/common/scripts/package.json/module.json
PKG_CJS=$GITPOD_REPO_ROOT/common/scripts/package.json/commonjs.json

cp "$PKG_MODULE" "$GITPOD_REPO_ROOT/libraries/api/lib/package.json"
cp "$PKG_CJS" "$GITPOD_REPO_ROOT/libraries/api/lib-commonjs/package.json"

cp "$PKG_MODULE" "$GITPOD_REPO_ROOT/libraries/types/lib/package.json"
cp "$PKG_CJS" "$GITPOD_REPO_ROOT/libraries/types/lib-commonjs/package.json"

cp "$PKG_MODULE" "$GITPOD_REPO_ROOT/libraries/util/lib/package.json"
cp "$PKG_CJS" "$GITPOD_REPO_ROOT/libraries/util/lib-commonjs/package.json"
