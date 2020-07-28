/**
 * At the end we must get the calculated hashes
 * content_hash - hex encoded
 * metadata_hash - hex encoded
 * perceptual_hash - hex encoded ???
 *
 * @param {[Operation]} operations
 * @param {Buffer} file
 * @param {Buffer} rawPixels
 * @return {Promise<string[]>}
 */

import { hexToString, stringCamelCase } from '@polkadot/util'

export async function executeOps (
  operations,
  data
): Promise<Array<{ name: string; output: string }>> {
  const { rawPixels, file } = data
  return await Promise.all(
    operations.map(async operation => {
      const {
        data: { op: OperationName }
      } = operation

      const op = hexToString(OperationName.toString())
      const t = await import(`./operations/${stringCamelCase(op)}`)
      const output = await t.default({ rawPixels, file })
      console.debug(`Executed op ${op}:`, output)
      return { name: op, output }
    })
  )
}
