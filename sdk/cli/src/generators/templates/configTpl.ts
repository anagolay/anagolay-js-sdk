import { SnOperation } from '@sensio/types'

export const configTemplate = (op: SnOperation): string =>
  `/**
 * Operation specification
 */

 export default ${JSON.stringify(op, null, 2)}
`

export default configTemplate
