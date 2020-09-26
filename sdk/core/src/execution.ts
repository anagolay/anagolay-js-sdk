/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { stringCamelCase } from '@polkadot/util'
import { SnOperation } from '@sensio/types'
import { composeWith, flatten, isEmpty, length, reverse } from 'ramda'

/**
 * Execute the children first in the LEAF->Parent mode by passing the data into the child first
 * ```typescript
 * return await executeOperation<InputParams, ReturnParams>(
 *   config as SnOperation,
 *   params
 * )
 * ```
 * @param config [SnOperation]
 * @param params [T] In the calling of this function this will be InputParams
 * @typeParam T  Type `T`, in the calling of this function this will be InputParams
 * @typeParam R  Type `R` is the generic type of the result of the called function that is passed to other function
 */
export async function executeOperation<T, R>(config: SnOperation, params: T): Promise<R> {
  // console.time(`executeOperation:${config.data.name}`)
  // build the exec flow from dependent operations
  const methods = buildExec(config)

  // iterate over the dependent operations and compose them for execution
  let composedMethods: any[] = []
  if (!isEmpty(config.data.ops)) {
    composedMethods = await Promise.all(
      methods.map(async (op) => {
        const imported = await import(generateNpmName(op.data.name))

        return imported[stringCamelCase(op.data.name)]
      }),
    )
  } else {
    const imported = await import(generateNpmName(config.data.name))

    const importedMethod = imported[stringCamelCase(config.data.name)]
    composedMethods.push(importedMethod)
  }

  // @FUCK what a hack way to make shit work
  const args = reverse(composedMethods) as [(x: any) => any]

  // console.debug('executeOperation:: args', args)

  const composeWithFn = composeWith(
    async (fn, res): Promise<any> => {
      // console.debug('composeWithFn', { name: fn.name, res: await res })

      if (length(res) > 1) {
        return fn(res)
      } else {
        return fn([await res])
      }
    },
  )

  // @TODO fix the typing when you can
  const res = composeWithFn(args)(params) as R

  // console.timeEnd(`executeOperation:${config.data.name}`)

  return res
}

/**
 * Build execution flow of dependent children, good starting point for building the segments
 * @param op
 */
function buildExec(op: SnOperation): SnOperation[] {
  /**
   * Visit a single operation and recurse it to build the exec array
   * @param op
   */
  function visit(op: SnOperation): SnOperation[] {
    // ops we don't need, the rest yes
    const { ops: _unusedOps, ...rest } = op.data

    // recurse from the LEAF node
    const d = op.data.ops.map((o) => buildExec(o))

    // need to flatten this, because the result is like [[op,op]]
    // Returns a new list by pulling every item out of it (and all its sub-arrays) and putting them in a new array, depth-first.

    const flat = flatten(d)

    // we don't need the ops in this case, it would make the tree too long for no reason
    return [...flat, { id: op.id, data: { ...rest, ops: [] } }]
  }

  return visit(op)
}

/**
 * Generate @sensio/op-snake-name-operation
 * @param {string} opName
 * @return {string}
 */
export function generateNpmName(opName: string): string {
  return `@sensio/op-${opName.replace(/_/g, '-')}`
}
