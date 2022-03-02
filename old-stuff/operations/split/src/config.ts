/**
 * Operation specification
 */
import { AnOperation } from '@anagolay/types'

export const op: AnOperation = {
  id: 'bafymbzaciccufb5g23rrlbqrvdbagcvzuy6xhmt64nsxj4d5j32ikogfb4jmm7ycs2v4y3zqorrbtkmv6kot3hsyf7c2suefx546jjigyotvzeio',
  data: {
    name: 'split',
    desc: 'Takes in the operation name and its outputs, then splits in to N copies of the same operation with output values.',
    input: [
      {
        data: 'AnByteArray',
        decoded: 'AnSplitParams',
      },
    ],
    groups: [6],
    priority: 0,
    output: {
      desc: 'Returns the object with *k* and *v* keys, where *k* is op name and *v* the output value.',
      output: 'AnByteArray',
      decoded: 'AnProofParams[]',
    },
    hashingOp: 'cid',
    encOp: 'enc_hex',
    ops: [],
  },
}

export default op
