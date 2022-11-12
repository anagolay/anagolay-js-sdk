import { readFile } from 'fs/promises';
import { resolve } from 'path';

import { run } from './modify';
import { createFiles } from './packageJson';

async function main(): Promise<void> {
  const packageJsonPath: string = resolve(process.cwd(), '../package.json');
  const { name } = JSON.parse((await readFile(packageJsonPath)).toString());

  const esmLibPath: string = resolve(process.cwd(), '../lib');
  const cjsLibPath: string = resolve(process.cwd(), '../lib-commonjs');

  await run(esmLibPath);

  await createFiles(esmLibPath, 'module', name);
  await createFiles(cjsLibPath, 'commonjs', name);
}
main()
  .then(() => console.log('DONE!!'))
  .catch(console.error);
