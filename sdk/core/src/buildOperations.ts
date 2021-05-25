import { AnOperation, AnOperationDataForCreating } from '@anagolay/types'

import { generateOperation } from './resolveDependencies'

/**
 * Visit each of the Operation nodes, the recursion is inside this function.
 * @param node
 * @returns full AnOperation with its children
 */
async function visitNode(node: AnOperationDataForCreating): Promise<AnOperation> {
  // function for the recursion
  async function visit(node: AnOperationDataForCreating): Promise<AnOperation> {
    // this is the way how to use _unusedWithCamelCase
    const { opNames: _unusedOpNames, ops: _unusedOps, ...rest } = node

    // build the skeleton and reset the ops
    const newNode: AnOperation = { id: '', data: { ...rest, ops: [] } }

    // Let's iterate over the node's child operations first. this will give us the LAST(a LEAF) operation in the tree
    newNode.data.ops = await Promise.all(node.ops.map(async (o) => await visitNode(o)))

    // populate the ops and data from the recursion call
    return await generateOperation({ ...rest, ...newNode.data })
  }

  return await visit(node)
}

/**
 * Build Operations from given operation data with the dependencies. Find the last child in the tree and recursively build the Operation tree.
 * @param [AnOperationDataForCreating[]] ops
 * @returns List of AnOperation objects
 */
export default async function buildOperations(
  ops: AnOperationDataForCreating[],
): Promise<AnOperation[]> {
  return await Promise.all(
    ops.map(async (o) => {
      return await visitNode(o)
    }),
  )
}
