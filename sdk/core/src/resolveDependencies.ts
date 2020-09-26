/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import {
  SnForWhat,
  SnInputParamsDefinition,
  SnOperation,
  SnOperationData,
  SnOperationDataForCreating,
} from '@sensio/types'
import {
  compose,
  find,
  includes,
  isEmpty,
  isNil,
  length,
  map,
  prop,
  propEq,
  sortBy,
  sum,
} from 'ramda'
import { IncompatibleInputParamChildOperationError } from './errors/IncompatibleInputParamChildOperation'
import { calculateOperationId } from './util/hashing'

/**
 * First version of Resolving operation dependencies, input param creation and priority calculation.
 * @param ops
 * @returns List of SnOperationDataForCreating with dependencies resolved
 */
export async function resolveDependencies(
  ops: SnOperationDataForCreating[],
): Promise<SnOperationDataForCreating[]> {
  const count = (arr: string[]): number => arr.length
  const sortByDependencies = sortBy(compose(count, prop('opNames')))
  const sorted: SnOperationDataForCreating[] = sortByDependencies(ops)
  /**
   * Resolve a single Operation with its dependencies
   * @param op
   */
  async function resolve(op: SnOperationDataForCreating): Promise<SnOperationDataForCreating> {
    const opNames: string[] = prop('opNames', op)

    if (isNil(opNames)) {
      throw new Error('opNames param missing for ' + op.name)
    }

    if (isEmpty(opNames)) {
      return op
    } else {
      if (includes(op.name, opNames)) {
        throw new Error('Circular reference are not allowed for direct children.')
      }

      const children = await Promise.all(
        opNames.map(async (o) => {
          if (isEmpty(o)) {
            throw new Error('Dependency must have a name, not an empty string')
          }
          // find the operation in the list of sorted ops
          const directDep = find(propEq('name', o))(sorted) as SnOperationDataForCreating
          return await resolve(directDep)
        }),
      )

      const childrenInputs = children.map((m) => {
        const potentialInput = createInputFromOutput(m)
        if (isEmpty(op.input) && includes(SnForWhat.FLOWCONTROL, op.groups)) {
          return potentialInput
        } else {
          if (!includes(potentialInput, op.input)) {
            throw new IncompatibleInputParamChildOperationError(
              op.name,
              m.name,
              op.input,
              potentialInput,
            )
          } else {
            return potentialInput
          }
        }
      })

      return calculatePriority({
        ...op,
        ops: children,
        input: [...childrenInputs],
      })
    }
  }

  const parsed = await Promise.all(
    sorted.map(async (s) => {
      return await resolve(s)
    }),
  )

  return parsed
}

/**
 * Calculate Operation priority based on priorities of direct children. It is a sum of all child priorities + the amount of direct children.
 * ```md
 * operationPriority = sum(children.priority) + children.length
 * ```
 * @param node
 * @returns New SnOperationDataForCreating object
 */
export function calculatePriority(node: SnOperationDataForCreating): SnOperationDataForCreating {
  const { ops } = node
  const childPriority = sum(map((o) => o.priority, ops))
  const priority = length(ops) + childPriority

  return {
    ...node,
    priority,
  }
}

/**
 * Create SnOperation
 * @param op
 */
export async function generateOperation(op: SnOperationData): Promise<SnOperation> {
  return {
    id: await calculateOperationId(op),
    data: op,
  }
}

/**
 * Generate Input param for the parent operation from given child operation
 * @param op
 */
export function createInputFromOutput(
  childOp: SnOperationDataForCreating,
): SnInputParamsDefinition {
  return {
    data: childOp.output.output,
    decoded: childOp.output.decoded,
  }
}

export default resolveDependencies
