import { SnOperation } from '@sensio/types'

export const configTemplate = (op: SnOperation): string =>
  `/**
 * Operation specification
 */
import { SnOperation } from '@sensio/types'

export const op:SnOperation = ${JSON.stringify(op, null, 2)}

export default op
`

export default configTemplate
