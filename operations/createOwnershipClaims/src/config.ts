/**
 * Operation specification
 */
import { AnOperation } from '@anagolay/types'

export const op: AnOperation = {
  id: 'bafymbzacidj7kxaldhy3wockslweavsz3ogdmve4djsig3ghkunuy6gpuqctxh5ybjjoaba5koje2nxerna6fsmh2muwczmzxvl2pagm4iwtzg2r',
  data: {
    desc: 'Create the Ownership Claims from the existing PoE from the Anagolay Network.',
    name: 'create_ownership_claims',
    input: [
      {
        data: 'AnByteArray',
        decoded: 'AnGenericIds',
      },
    ],
    output: {
      desc: 'Return the list of the Ownership Claims',
      output: 'AnByteArray',
      decoded: 'AnOwnershipClaims',
    },
    groups: [6],
    priority: 0,
    hashingOp: 'cid',
    encOp: 'enc_hex',
    ops: [],
  },
}

export default op
