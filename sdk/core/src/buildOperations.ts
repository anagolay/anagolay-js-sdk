import { SnOperation, SnOperationDataForCreating } from '@sensio/types'
import { generateOperation } from './resolveDependencies'

/**
 * Visit each of the Operation nodes, the recursion is inside this function.
 * @param node
 * @returns full SnOperation with its children
 */
async function visitNode (
  node: SnOperationDataForCreating
): Promise<SnOperation> {
  // function for the recursion
  async function visit (
    node: SnOperationDataForCreating
  ): Promise<SnOperation> {
    // this is the way how to use _unusedWithCamelCase
    const { opNames: _unusedOpNames, ops: _unusedOps, ...rest } = node

    // build the skeleton and reset the ops
    const newNode: SnOperation = { id: '', data: { ...rest, ops: [] } }

    // Let's iterate over the node's child operations first. this will give us the LAST(a LEAF) operation in the tree
    newNode.data.ops = await Promise.all(
      node.ops.map(async o => await visitNode(o))
    )

    // populate the ops and data from the recursion call
    return await generateOperation({ ...rest, ...newNode.data })
  }

  return await visit(node)
}

/**
 * Build Operations from given operation data with the dependencies. Find the last child in the tree and recursively build the Operation tree.
 * @param [SnOperationDataForCreating[]] ops
 * @returns List of SnOperation objects
 */
export default async function buildOperations (
  ops: SnOperationDataForCreating[]
): Promise<SnOperation[]> {
  return await Promise.all(
    ops.map(async o => {
      return await visitNode(o)
    })
  )
}
