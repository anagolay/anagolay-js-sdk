/* eslint-disable no-async-promise-executor */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { AnOperation } from '@anagolay/types'
import { composeWith, flatten, length, reverse } from 'ramda'
import generateNpmName from './util/generateNpmName'
import stringToCamelCase from './util/stringToCamelCase'

/**
 * Execute the children first in the LEAF->Parent mode by passing the data into the child first
 * ```typescript
 * return await executeOperation<InputParams, ReturnParams>(
 *   config as AnOperation,
 *   params
 * )
 * ```
 * @param config [AnOperation]
 * @param params [T] In the calling of this function this will be InputParams
 * @typeParam T  Type `T`, in the calling of this function this will be InputParams
 * @typeParam R  Type `R` is the generic type of the result of the called function that is passed to other function
 */
export default async function executeOperation<T, R>(config: AnOperation, params: T): Promise<R> {
  // return new Promise(async (resolve, reject) => {
  // console.time(`executeOperation:${config.data.name}`)
  // build the exec flow from dependent operations
  const methods = buildExec(config)
  // iterate over the dependent operations and compose them for execution
  let composedMethods: unknown[] = []

  /**
   * This is the way to find the LEAF operation that has no child operations. We execute from that up.
   */
  composedMethods = await Promise.all(
    methods.map(async (op) => {
      // console.log(generateNpmName(config.data.name))
      try {
        const imported = await import(generateNpmName(op.data.name))

        // this one will take the named export function name
        return imported[stringToCamelCase(op.data.name)]
      } catch (error) {
        console.log(
          `Could't load the ${generateNpmName(op.data.name)} for ${config.data.name}`,
          methods,
        )
        console.error(error)
      }
    }),
  )

  // @FUCK what a hack way to make shit work, the types that is
  // need to reverse it because the composeWith uses from right to left
  const args = reverse(composedMethods) as [(x: unknown) => unknown]

  // console.debug('executeOperation:: args', args)
  /**
   * This one is hard to grasp after long time not working on it.
   * Docs are here >> https://ramdajs.com/docs/#composeWith
   *
   * How this works is that the the res is the result of the last item in the list that is passed in the execution. the res is passed to next function and then to next until it's the end
   *
   * Worth to note that the debug will always be -1 agains the length(args) becuse the first one is never logged
   *
   */
  const executeOperationNamedExport = composeWith(async (fn, res): Promise<R> => {
    // console.debug('executeOperationNamedExport', { name: fn.name, res: await res })

    /**
     * If the res( input param ) is bigger than 1 pass it to the fn
     */
    if (length(res) > 1) {
      console.log(res)
      throw new Error('res is bigger than 1')
    } else {
      console.log(`executing the fn ${fn} with res ${await res}`)

      return await fn([await res])
    }
  })

  /**
   * The args is the list of the loaded modules like this:
   * ```
   * executeOperation:: args [ [AsyncFunction: imageMetadata], [AsyncFunction: file] ]
   * ```
   * When we call the executeOperationNamedExport with params the method will first pass the params into the last item in the array ( which is first from right to left ) then the result of the function will be passed into the actual function.
   */
  const res = (await executeOperationNamedExport(args)(params)) as R

  // console.log('RESSSS ', res, config.data.name)
  // console.log('res logging', res)
  // const res = (await Promise.all(
  //   args.map(async (arg, i) => {
  //     console.log(arg, params)

  //     // if (length(res) > 1) {
  //     //   return fn(res)
  //     // } else {
  //     //   return fn([await res])
  //     // }
  //   }),
  // )) as R
  // console.timeEnd(`executeOperation:${config.data.name}`)

  return res
  // resolve(res)
  // })
}

/**
 * Build execution flow of dependent children, good starting point for building the segments
 * @param op
 */
function buildExec(op: AnOperation): AnOperation[] {
  /**
   * Visit a single operation and recurse it to build the exec array
   * @param op
   */
  function visit(op: AnOperation): AnOperation[] {
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
