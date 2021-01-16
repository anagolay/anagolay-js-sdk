/**
 * Operation specification
 */
import { SnOperation } from '@sensio/types'

export const op: SnOperation = {
  id: 'bafy2bzacecxvve6bdbjvokspk2ocvk6m2yvrykcguzluf6q2criwnwzz4hnnw',
  data: {
    name: 'sn_match_all',
    desc:
      'This operation must have children ops. **ALL** the outputs of children ops must be the same in order to proceed.',
    input: [],
    groups: [6, 7],
    priority: 0,
    output: {
      desc: 'Returns true, if all match or throws an error if some match.',
      output: 'SnBoolean',
      decoded: 'SnBoolean',
    },
    hashingOp: 'sn_cid',
    encOp: 'sn_enc_hex',
    ops: [],
  },
}

export default op
