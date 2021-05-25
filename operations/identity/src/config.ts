/**
 * Operation specification
 */
import { AnOperation } from '@anagolay/types'

export const op: AnOperation = {
  id: 'bafymbzaciaricmtpsg5hratxfke4ysw5wdrtrztiqjjjshyz3rgnq4bcseoaf6rqbcdma52744osxznat3sbvzx2mpuvsm722kmg2bailbcnyizg',
  data: {
    name: 'identity',
    desc: 'What comes in that comes out, identity function, must be a parent of the USER operation. Only one child is accepted.',
    input: [
      {
        data: 'AnByteArray',
        decoded: 'AnAny',
      },
    ],
    groups: [6],
    priority: 0,
    output: {
      desc: '',
      output: 'AnByteArray',
      decoded: 'AnAny',
    },
    hashingOp: 'cid',
    encOp: 'enc_hex',
    ops: [],
  },
}

export default op
