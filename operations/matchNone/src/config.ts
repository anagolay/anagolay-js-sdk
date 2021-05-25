/**
 * Operation specification
 */
import { AnOperation } from '@anagolay/types'

export const op: AnOperation = {
  id: 'bafymbzaciabyxyycn3a2gf2ek6ehe5hxnga47cvuxeenmp65jh2tzkqa4apir75ybm4szbjl5nxtuvszdgc6n37nzi3jzwji44sqivj3kxm342wx',
  data: {
    name: 'match_none',
    desc: 'This operation must have children ops. **NONE** the outputs of children ops must be the same in order to proceed.',
    input: [],
    groups: [6, 7],
    priority: 0,
    output: {
      desc: 'Returns true, if none match or throws an error if some match.',
      output: 'AnBoolean',
      decoded: 'AnBoolean',
    },
    hashingOp: 'cid',
    encOp: 'enc_hex',
    ops: [],
  },
}

export default op
