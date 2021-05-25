/**
 * Operation specification
 */
import { AnOperation } from '@anagolay/types'

export const op: AnOperation = {
  id: 'bafymbzacibloddrmip337xyqv7ds26thulyocavlgm6xlivkf2fbxsmo64ccbbvwubecp6ds7wdjfljb2zjwqxlkzwm73zxehq7t2jpcb4cerxec',
  data: {
    name: 'json_enc',
    desc: 'Wrapper of JSON.stringify().',
    input: [
      {
        data: 'AnAny',
        decoded: 'AnAny',
      },
    ],
    groups: [6],
    priority: 0,
    output: {
      desc: 'Returns AnByteArray of json string.',
      output: 'AnByteArray',
      decoded: 'AnString',
    },
    hashingOp: 'cid',
    encOp: 'enc_hex',
    ops: [],
  },
}

export default op
