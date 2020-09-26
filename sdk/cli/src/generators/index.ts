/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { stringCamelCase } from '@polkadot/util'
import buildOperations from '@sensio/core/buildOperations'
import { resolveDependencies } from '@sensio/core/resolveDependencies'
import { SnOperation, SnOperationDataForCreating } from '@sensio/types'
import { copy, outputFile, outputJson, pathExistsSync, WriteOptions } from 'fs-extra'
import { resolve } from 'path'
import configTemplate from './templates/configTpl'
import interfacesTpl from './templates/interfacesTpl'
import { mainFuncBodyTpl } from './templates/mainFuncBodyTpl'
import packageJson from './templates/packageJson'
import readmeTpl from './templates/README'
import spec from './templates/specTpl'
import tsConfigJson from './templates/tsConfig'

const JSONOptions: WriteOptions = { replacer: null, spaces: 2 }
const tsPaths: { [k: string]: string[] } = {}
const tsReference: any[] = []

export const genOperation = async (op: SnOperation): Promise<void> => {
  const opName: string = stringCamelCase(op.data.name)
  const PATH = resolve(__dirname, `../../../../operations/${opName}`)
  const paths = {
    configTs: `${PATH}/src/config.ts`,
    configJson: `${PATH}/src/config.json`,
    spec: `${PATH}/src/index.spec.ts`,
    index: `${PATH}/src/index.ts`,
    interfaces: `${PATH}/src/interfaces.ts`,
    packageJson: `${PATH}/package.json`,
    tsConfigJson: `${PATH}/tsconfig.json`,
    readme: `${PATH}/README.md`,
    license: `${PATH}/LICENSE`,
  }

  // should we create the operation
  let shouldCreate = true

  if (pathExistsSync(paths.configTs)) {
    const { id }: SnOperation = (await import(paths.configTs)).default
    if (id === op.id) {
      shouldCreate = false
    }
  }

  if (shouldCreate) {
    generateTsConfigPaths(op)
    generateTsConfigReferencePaths(op)

    await outputFile(resolve(__dirname, paths.configTs), configTemplate(op))
    await outputJson(resolve(__dirname, paths.configJson), op, JSONOptions)
    await outputFile(resolve(__dirname, paths.interfaces), interfacesTpl(op))
    await outputFile(resolve(__dirname, paths.readme), readmeTpl(op))
    await outputJson(resolve(__dirname, paths.tsConfigJson), tsConfigJson(), JSONOptions)
    await copy(resolve(__dirname, './templates/LICENSE'), resolve(__dirname, paths.license))

    if (!pathExistsSync(paths.spec)) {
      await outputFile(resolve(__dirname, paths.spec), spec(op))
    }

    if (!pathExistsSync(paths.index)) {
      await outputFile(resolve(__dirname, paths.index), mainFuncBodyTpl(op))
    }

    if (!pathExistsSync(paths.packageJson)) {
      await outputJson(resolve(__dirname, paths.packageJson), packageJson(op), JSONOptions)
    }
    console.log(`SUCCESS: ${generateNpmName(op.data.name)} generated with CID ${op.id}`)
  }
}

/**
 * Generate operations file
 * @param ops
 */
export const genDefaultOpsFile = async (ops: SnOperation[]): Promise<void> => {
  const PATH = resolve(__dirname, '../defaultOps.ts')
  const contents = ops
    .map((op) => `export const ${stringCamelCase(op.data.name)} = ${JSON.stringify(op, null, 2)}`)
    .join('\n \n')

  await outputFile(resolve(__dirname, PATH), contents)
  console.log(`SUCCESS: defaultOps file generated at ${PATH}`)
}
/**
 * Main function for scaffolding the ops
 * @param originalOperations
 */
export async function regenerateDefaultOperations(
  originalOperations: SnOperationDataForCreating[],
): Promise<SnOperation[]> {
  const defaultOps = await parseOriginalOperations(originalOperations)

  await Promise.all(defaultOps.map(async (o) => await genOperation(o)))
  console.log('tsconfig.paths', tsPaths)
  console.log('operations/tsconfig.references', tsReference)

  // console.log(JSON.stringify(defaultOps))

  return defaultOps
}

/**
 * Generate tsconfig paths
 * @param op
 */
export function generateTsConfigPaths(op: SnOperation): void {
  const camelCasedName: string = stringCamelCase(op.data.name)

  tsPaths[generateNpmName(op.data.name)] = [`operations/${camelCasedName}/src`]
  tsPaths[generateNpmName(op.data.name) + '/*'] = [`operations/${camelCasedName}/src/*`]
}
/**
 * Generate tsconfig reference paths
 * @param op
 */
export function generateTsConfigReferencePaths(op: SnOperation): void {
  tsReference.push({ path: `./${stringCamelCase(op.data.name)}` })
}

/**
 *
 * @param opsRaw
 */
async function parseOriginalOperations(
  allOps: SnOperationDataForCreating[],
): Promise<SnOperation[]> {
  const depsResolved = await resolveDependencies(allOps)
  const res = await buildOperations(depsResolved)

  return res
}

/**
 * Generate @sensio/op-snake-name-operation
 * @param {string} opName
 * @return {string}
 */
export function generateNpmName(opName: string): string {
  return `@sensio/op-${opName.replace(/_/g, '-')}`
}

/**
 * Convert the name excluding sn as keywords for package.json
 * @param opName
 */
export function nameToKeywords(opName: string): string[] {
  const ar = opName.split('_')
  return ar.slice(1, ar.length)
}

/**
 * Creates camelCase string from any string, character that are after numbers are not camelized
 ```ts
  const list = ['sn came case', 'Sn Camel case', 'sn-camel-case', 'sn_camel_case']
  const l = list.map(l=>stringToCamelCase(l))
  // ["snCameCase", "snCamelCase", "snCamelCase", "snCamelCase"]
  ```
 *
 * @param str String to make camelCase out of
 */
export function stringToCamelCase(str: string): string {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_m, chr) => chr.toUpperCase())
}
