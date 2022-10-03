#!/usr/bin/env bash
set -ex

PKG_MODULE=$GITPOD_REPO_ROOT/common/scripts/package.json/module.json
PKG_CJS=$GITPOD_REPO_ROOT/common/scripts/package.json/commonjs.json

cp "$PKG_MODULE" "$GITPOD_REPO_ROOT/sdk/api/lib/package.json"
cp "$PKG_CJS" "$GITPOD_REPO_ROOT/sdk/api/lib-cjs/package.json"

cp "$PKG_MODULE" "$GITPOD_REPO_ROOT/sdk/types/lib/package.json"
cp "$PKG_CJS" "$GITPOD_REPO_ROOT/sdk/types/lib-cjs/package.json"

cp "$PKG_MODULE" "$GITPOD_REPO_ROOT/sdk/util/lib/package.json"
cp "$PKG_CJS" "$GITPOD_REPO_ROOT/sdk/util/lib-cjs/package.json"
