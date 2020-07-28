import { SnOperation } from '@sensio/types'

export const defaultOperationTpl = (op: SnOperation): string =>
  `/**
 * Operation specification
 */

 export const config = ${JSON.stringify(op, null, 2)}
 export default config`
