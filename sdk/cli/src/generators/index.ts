/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { stringCamelCase, stringToU8a } from '@polkadot/util'
import { SnOperation, SnOperationData } from '@sensio/types'
import CID from 'cids'
import { copy, outputFile, outputJson, pathExistsSync, WriteOptions } from 'fs-extra'
import mh from 'multihashing-async'
import { resolve } from 'path'
import { defaultOperationTpl } from './templates/defaultOperationTpl'
import { mainFuncBodyTpl } from './templates/mainFuncBodyTpl'
import packageJson from './templates/packageJson'
import readmeTpl from './templates/README'
import spec from './templates/specTpl'
import tsConfigJson from './templates/tsConfig'

const JSONOptions: WriteOptions = { replacer: null, spaces: 2 }

const tsPaths: {[k: string]: string[]} = {}
const tsReference: any[] = []

export const genOperation = async (
  op: SnOperation,
  force = false
): Promise<void> => {
  generateTsConfigPaths(op)
  generateTsConfigReferencePaths(op)

  const opName: string = stringCamelCase(op.data.name)
  const PATH = resolve(__dirname, `../../../../operations/${opName}`)
  const paths = {
    configTs: `${PATH}/src/config.ts`,
    configJson: `${PATH}/src/config.json`,
    spec: `${PATH}/src/index.spec.ts`,
    index: `${PATH}/src/index.ts`,
    packageJson: `${PATH}/package.json`,
    tsConfigJson: `${PATH}/tsconfig.json`,
    readme: `${PATH}/README.md`,
    license: `${PATH}/LICENSE`
  }

  if (force || !pathExistsSync(paths.readme)) {
    await outputFile(resolve(__dirname, paths.readme), readmeTpl(op))
  }
  if (force || !pathExistsSync(paths.license)) {
    await copy(
      resolve(__dirname, './templates/LICENSE'),
      resolve(__dirname, paths.license)
    )
  }
  if (force || !pathExistsSync(paths.configTs)) {
    await outputFile(
      resolve(__dirname, paths.configTs),
      defaultOperationTpl(op)
    )
  }

  if (!pathExistsSync(paths.spec)) {
    await outputFile(resolve(__dirname, paths.spec), spec(op))
  }

  if (!pathExistsSync(paths.index)) {
    await outputFile(resolve(__dirname, paths.index), mainFuncBodyTpl(op))
  }

  if (!pathExistsSync(paths.packageJson)) {
    await outputJson(
      resolve(__dirname, paths.packageJson),
      packageJson(op),
      JSONOptions
    )
  }

  if (force || !pathExistsSync(paths.configJson)) {
    await outputJson(resolve(__dirname, paths.configJson), op, JSONOptions)
  }

  if (force || !pathExistsSync(paths.tsConfigJson)) {
    await outputJson(
      resolve(__dirname, paths.tsConfigJson),
      tsConfigJson(),
      JSONOptions
    )
  }

  console.log(`SUCCESS: ${generateNpmName(op.data.name)} generated at ${PATH}`)
}

/**
 * Generate operations file
 * @param ops
 */
export const genDefaultOpsFile = async (ops: SnOperation[]): Promise<void> => {
  const PATH = resolve(__dirname, '../defaultOps.ts')
  const contents = ops
    .map(
      (op) =>
        `export const ${stringCamelCase(op.data.name)} = ${JSON.stringify(
          op,
          null,
          2
        )}`
    )
    .join('\n \n')

  await outputFile(resolve(__dirname, PATH), contents)
  console.log(`SUCCESS: defaultOps file generated at ${PATH}`)
}
/**
 * Main function for scaffolding the ops
 * @param originalOperations
 */
export async function regenerateOperations (
  originalOperations: SnOperationData[]
): Promise<SnOperation[]> {
  const defaultOps = await parseOriginalOperations(originalOperations)
  await Promise.all(defaultOps.map(async (o) => await genOperation(o)))
  console.log('tsconfig.paths', tsPaths)
  console.log('tsconfig.references', tsReference)
  return defaultOps
}

/**
 * Generate tsconfig paths
 * @param op
 */
export function generateTsConfigPaths (op: SnOperation): void {
  const camelCasedName: string = stringCamelCase(op.data.name)

  tsPaths[generateNpmName(op.data.name)] = [`"operations/${camelCasedName}/src"`]
  tsPaths[generateNpmName(op.data.name) + '/*'] = [`"operations/${camelCasedName}/src/*"`]
}
/**
 * Generate tsconfig reference paths
 * @param op
 */
export function generateTsConfigReferencePaths (op: SnOperation): void {
  tsReference.push({ path: `./${stringCamelCase(op.data.name)}` })
}

/**
 *
 * @param opsRaw
 */
async function parseOriginalOperations (
  opsRaw: SnOperationData[]
): Promise<SnOperation[]> {
  return await Promise.all(
    opsRaw.map(async (op): Promise<SnOperation> => await makeOperation(op))
  )
}

/**
 * Generate @sensio/op-snake-name-operation
 * @param {string} opName
 * @return {string}
 */
export function generateNpmName (opName: string): string {
  return `@sensio/op-${opName.replace(/_/g, '-')}`
}

/**
 * Better to keep this decoupled from operations (i.e. snCid which does the same job)
 * @param data
 */
async function makeOperation (data: SnOperationData): Promise<SnOperation> {
  const algo = `${data.hashing.algo}-${data.hashing.bits}`
  const multiHash = await mh(stringToU8a(JSON.stringify(data)), algo)
  const cid = new CID(1, 'dag-cbor', multiHash)
  const id = cid.toV1().toString()

  return { id, data }
}
