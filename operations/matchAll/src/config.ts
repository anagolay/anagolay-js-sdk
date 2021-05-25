/**
 * Operation specification
 */
import { AnOperation } from '@anagolay/types'

export const op: AnOperation = {
  id: 'bafymbzaciaiqndlgf6au3ftfnpfifzqrgf3qj47hfypj6q3vpvq5zujmydkpdumliyg2b56w3tempf2px2vvugw5th5iedxqqbky7khy25rvu256',
  data: {
    name: 'match_all',
    desc: 'This operation must have children ops. **ALL** the outputs of children ops must be the same in order to proceed.',
    input: [],
    groups: [6, 7],
    priority: 0,
    output: {
      desc: 'Returns true, if all match or throws an error if some match.',
      output: 'AnBoolean',
      decoded: 'AnBoolean',
    },
    hashingOp: 'cid',
    encOp: 'enc_hex',
    ops: [],
  },
}

export default op
