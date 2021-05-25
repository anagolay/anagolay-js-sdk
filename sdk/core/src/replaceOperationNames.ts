/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { length } from 'ramda'

import { AnGenericId } from '@anagolay/types'

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

    const ret: { id: AnGenericId; children: any[] } = { id: imported.id, children: [] }

    if (length(processedChildren) > 0) ret.children = processedChildren

    return ret
  }

  const parsed = await Promise.all(ops.map(async (s) => await resolveOp(s)))

  return parsed
}
