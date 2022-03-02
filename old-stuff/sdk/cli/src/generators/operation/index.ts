/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import buildOperations from '@anagolay/core/buildOperations';
import { resolveDependencies } from '@anagolay/core/resolveDependencies';
import generateNpmName from '@anagolay/core/util/generateNpmName';
import { AnOperation, AnOperationDataForCreating } from '@anagolay/types';
import { stringCamelCase } from '@anagolay/util';
import { copy, outputFile, outputJson, pathExistsSync, WriteOptions } from 'fs-extra';
import { writeFile } from 'fs/promises';
import { resolve } from 'path';
import configTemplate from './templates/configTpl';
import specIndex from './templates/indexSpecTpl';
import interfacesTpl from './templates/interfacesTpl';
import { mainFuncBodyTpl } from './templates/mainFuncBodyTpl';
import { mainFuncExports } from './templates/mainFuncExports';
import packageJson from './templates/packageJson';
import readmeTpl from './templates/README';
import specModule from './templates/specModule';
import tsConfigJson from './templates/tsConfig';

// import { fileURLToPath } from 'url'
// import { dirname } from 'path'

// // https://nodejs.org/docs/latest-v15.x/api/esm.html#esm_no_filename_or_dirname
// // const __filename = fileURLToPath(import.meta.url)
// // const __dirname = dirname(__filename)

const JSONOptions: WriteOptions = { replacer: null, spaces: 2 };
const tsPaths: { [k: string]: string[] } = {};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tsReference: any[] = [];

export const genOperation = async (op: AnOperation): Promise<void> => {
  const opName: string = stringCamelCase(op.data.name);
  const PATH = resolve(__dirname, `../../../../../operations/${opName}`);
  const paths = {
    configTs: `${PATH}/src/config.ts`,
    configJson: `${PATH}/src/config.json`,
    spec: `${PATH}/src/index.spec.ts`,
    specModule: `${PATH}/src/module.spec.ts`,
    index: `${PATH}/src/index.ts`,
    module: `${PATH}/src/module.ts`,
    interfaces: `${PATH}/src/interfaces.ts`,
    packageJson: `${PATH}/package.json`,
    tsConfigJson: `${PATH}/tsconfig.json`,
    readme: `${PATH}/README.md`,
    license: `${PATH}/LICENSE`,
  };

  // should we create the operation
  let shouldCreate = true;
  // let shouldCreate = false

  if (pathExistsSync(paths.configTs)) {
    const { id }: AnOperation = (await import(paths.configTs)).default;

    if (id === op.id) {
      shouldCreate = !shouldCreate;
    }
  }

  if (shouldCreate) {
    generateTsConfigPaths(op);
    generateTsConfigReferencePaths(op);

    await outputFile(resolve(__dirname, paths.configTs), configTemplate(op));
    await outputJson(resolve(__dirname, paths.configJson), op, JSONOptions);

    // if (!pathExistsSync(paths.interfaces)) {
    await outputFile(resolve(__dirname, paths.interfaces), interfacesTpl(op));
    // }

    if (!pathExistsSync(paths.readme)) {
      await outputFile(resolve(__dirname, paths.readme), readmeTpl(op));
    }

    if (!pathExistsSync(paths.tsConfigJson)) {
      await outputJson(resolve(__dirname, paths.tsConfigJson), tsConfigJson(), JSONOptions);
    }

    if (!pathExistsSync(paths.license)) {
      await copy(resolve(__dirname, './templates/LICENSE'), resolve(__dirname, paths.license));
    }

    if (!pathExistsSync(paths.spec)) {
      await outputFile(resolve(__dirname, paths.spec), specIndex(op));
    }

    if (!pathExistsSync(paths.specModule)) {
      await outputFile(resolve(__dirname, paths.specModule), specModule(op));
    }

    if (!pathExistsSync(paths.index)) {
      await outputFile(resolve(__dirname, paths.index), mainFuncExports(op));
    }

    if (!pathExistsSync(paths.module)) {
      await outputFile(resolve(__dirname, paths.module), mainFuncBodyTpl(op));
    }

    if (!pathExistsSync(paths.packageJson)) {
      await outputJson(resolve(__dirname, paths.packageJson), packageJson(op), JSONOptions);
    }

    console.log(`SUCCESS: ${generateNpmName(op.data.name)} generated with CID ${op.id}`);
  }
};

/**
 * Generate operations file
 * @param ops
 */
export const genDefaultOpsFile = async (ops: AnOperation[]): Promise<void> => {
  const PATH = resolve(__dirname, '../defaultOps.ts');
  const contents = ops
    .map((op) => `export const ${stringCamelCase(op.data.name)} = ${JSON.stringify(op, null, 2)}`)
    .join('\n \n');

  await outputFile(resolve(__dirname, PATH), contents);
  console.log(`SUCCESS: defaultOps file generated at ${PATH}`);
};

/**
 * Main function for scaffolding the ops
 * @param originalOperations
 */
export async function regenerateDefaultOperations(
  originalOperations: AnOperationDataForCreating[]
): Promise<AnOperation[]> {
  const defaultOps = await parseOriginalOperations(originalOperations);

  await Promise.all(defaultOps.map(async (o) => await genOperation(o)));
  console.log('tsconfig.paths', tsPaths);
  console.log('operations/tsconfig.references', tsReference);

  writeFile(resolve(__dirname, '../../fixtures/allOperations.json'), JSON.stringify(defaultOps));
  writeFile(
    resolve(__dirname, '../../fixtures/allOperationNames.json'),
    JSON.stringify(
      defaultOps.map((o) => o.data.name),
      null,
      2
    )
  );
  writeFile(
    resolve(__dirname, '../../../../core/src/fixtures/mapOperationNamesWithIDs.json'),
    JSON.stringify(
      defaultOps.map((o) => ({ id: o.id, name: generateNpmName(o.data.name) })),
      null,
      2
    )
  );

  return defaultOps;
}

/**
 * Generate tsconfig paths
 * @param op
 */
export function generateTsConfigPaths(op: AnOperation): void {
  const camelCasedName: string = stringCamelCase(op.data.name);

  tsPaths[generateNpmName(op.data.name)] = [`operations/${camelCasedName}/src`];
  tsPaths[generateNpmName(op.data.name) + '/*'] = [`operations/${camelCasedName}/src/*`];
}

/**
 * Generate tsconfig reference paths
 * @param op
 */
export function generateTsConfigReferencePaths(op: AnOperation): void {
  tsReference.push({ path: `./${stringCamelCase(op.data.name)}` });
}

/**
 *
 * @param opsRaw
 */
async function parseOriginalOperations(allOps: AnOperationDataForCreating[]): Promise<AnOperation[]> {
  const depsResolved = await resolveDependencies(allOps);
  const res = await buildOperations(depsResolved);

  return res;
}

/**
 * Convert the name excluding sn as keywords for package.json
 * @param opName
 */
export function nameToKeywords(opName: string): string[] {
  const ar = opName.split('_');

  return ar.slice(1, ar.length);
}
