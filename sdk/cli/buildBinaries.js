'use strict';

const { resolve } = require('path');
const { exec } = require('pkg');

async function main() {
  await exec([
    resolve(__dirname, './dist/anagolay.js'),
    '--target',
    'node17-linux-x64',
    '--output',
    resolve(__dirname, './binaries/anagolay-node17-linux-x64'),
  ]);
}

main().catch(console.error);
