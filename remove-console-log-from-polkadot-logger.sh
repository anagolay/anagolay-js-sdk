#!/usr/bin/env bash

sed -i 83's/.*/ \/\/ &/' ./node_modules/@polkadot/util/logger.js
