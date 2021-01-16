/* eslint-disable @typescript-eslint/no-explicit-any */
import { SnGenericId } from '@sensio/types'
import { length } from 'ramda'
import generateNpmName from './util/generateNpmName'

/**
 * Replace the operation names with their IDs and keep the structure
 * @TODO fix the types, the definition is:
 * ```ts
 * [string, string[]]
 * [string, string[][]]
 * [string, []]
 * ```
 * @TODO ATM there are no checks for the output->input matching
 * @param ops
 * @returns similar list as input but name replaced with IDs and without empty children
 */
export default async function replaceOperationNames(ops: any[]): Promise<any> {
  /**
   * Resolve the operation names and replace them with the ids
   * @param op Operation definition for the CLI and building `[string, string[]`]
   */
  async function resolveOp(op: any[]): Promise<any> {
    const [opName, children] = op
    const imported = await import(generateNpmName(opName) + '/config')
    const processedChildren = await Promise.all(children.map(async (o: any) => await resolveOp(o)))

    const ret: { id: SnGenericId; children: any[] } = { id: imported.id, children: [] }
    if (length(processedChildren) > 0) ret.children = processedChildren
    return ret
  }

  const parsed = await Promise.all(ops.map(async (s) => await resolveOp(s)))

  return parsed
}
