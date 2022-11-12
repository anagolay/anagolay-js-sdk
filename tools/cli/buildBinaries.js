'use strict';

const { resolve } = require('path');
const { exec } = require('pkg');

async function main() {
  console.log(`Building anagolay cli for node18`);
  await exec([
    resolve(__dirname, './dist/anagolay.js'),
    '--target',
    'node18-linux-x64',
    '--output',
    resolve(__dirname, './binaries/anagolay-node18-linux-x64')
  ]);
  console.log(`Binary is here %s`, resolve(__dirname, './binaries/anagolay-node18-linux-x64'));
  console.log(`🎉 done`);

  console.log(`Building anagolay cli for node16`);
  await exec([
    resolve(__dirname, './dist/anagolay.js'),
    '--target',
    'node16-linux-x64',
    '--output',
    resolve(__dirname, './binaries/anagolay-node16-linux-x64')
  ]);

  console.log(`Binary is here %s`, resolve(__dirname, './binaries/anagolay-node16-linux-x64'));
  console.log(`🎉 done`);
}

main().catch(console.error);
