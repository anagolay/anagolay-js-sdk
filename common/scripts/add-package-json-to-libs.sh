#!/usr/bin/env bash
set -ex

PKG_MODULE=$GITPOD_REPO_ROOT/common/scripts/package.json/module.json
PKG_CJS=$GITPOD_REPO_ROOT/common/scripts/package.json/commonjs.json

cp "$PKG_MODULE" "$GITPOD_REPO_ROOT/sdk/api/lib/package.json"
cp "$PKG_CJS" "$GITPOD_REPO_ROOT/sdk/api/lib_cjs/package.json"

cp "$PKG_MODULE" "$GITPOD_REPO_ROOT/sdk/types/lib/package.json"
cp "$PKG_CJS" "$GITPOD_REPO_ROOT/sdk/types/lib_cjs/package.json"

cp "$PKG_MODULE" "$GITPOD_REPO_ROOT/sdk/utils/lib/package.json"
cp "$PKG_CJS" "$GITPOD_REPO_ROOT/sdk/utils/lib_cjs/package.json"
