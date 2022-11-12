/**
 *
 * @param pgkType -
 * @param name -
 * @returns
 */

import { writeFile } from 'fs/promises';

export function makePackageJsonStringFor(pgkType: 'module' | 'commonjs', name: string): string {
  return JSON.stringify(
    {
      name,
      type: pgkType
    },
    null,
    2
  );
}

/**
 *
 * @param dirPath -
 * @param pgkType -
 * @param name -
 */
export async function createFiles(
  dirPath: string,
  pgkType: 'module' | 'commonjs',
  name: string
): Promise<void> {
  const cjsPkgJsonPath = `${dirPath}/package.json`;
  writeFile(cjsPkgJsonPath, makePackageJsonStringFor(pgkType, name));
}
