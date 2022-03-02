/**
 * Operation specification
 */
import { AnOperation } from '@anagolay/types'

export const op: AnOperation = {
  id: 'bafymbzaciaa6qnszmifhy4awgdyvn65gqeuvzmu4drerxb6pjutodfvuojmmhtmsu72unrmnrbxnclqbmnf2ep4dv6qveecksubrsdvrf5byjpwi',
  data: {
    name: 'json_dec',
    desc: 'Wrapper of JSON.parse()',
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
