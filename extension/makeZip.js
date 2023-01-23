import { exec } from '@anagolay/util';
import { existsSync } from 'fs';
import { stat } from 'fs/promises';
import { resolve } from 'path';
import { cwd } from 'process';

import pkgJson from './package.json' assert { type: 'json' };

/**
 * Make a zip file with the proper name and version
 * @returns
 */
async function main() {
  const zipName = `anagolay-extension_${pkgJson.version}.zip`;
  const zipPath = resolve(cwd(), './zipped');
  const zipFile = resolve(zipPath, zipName);
  const distPath = resolve(cwd(), './dist');

  await exec(`mkdir -p ${zipPath}`);

  // this will fail if doesn't exist
  await stat(zipPath);
  await stat(distPath);

  if (existsSync(zipFile)) {
    await exec(`rm -f ${zipFile}`);
  }

  await exec(`zip -r ${zipFile} *`, {
    cwd: distPath
  });

  const fileStat = await stat(zipFile);

  return { name: zipName, path: zipPath, size: fileStat.size };
}

main()
  .then((zipName) => {
    console.log(`Zip created`, zipName);
  })
  .catch((error) => {
    if (error.code === 'ENOENT') {
      console.log('ERROR occurred, probably dist, zipped directories are not there, run pnpm build.');
    }
  });
