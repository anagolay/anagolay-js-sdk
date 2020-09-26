/**
 * Operation specification
 */
import { SnOperation } from '@sensio/types'

export const op: SnOperation = {
  id: 'bafy2bzacebtqlbme62wogt4a7447lxsebvu5fncnht3eedmyvjle7t32ue46c',
  data: {
    desc: 'Sign the claims and return the tuple of claims and their signatures',
    name: 'sn_user_sign_claims',
    input: [
      {
        data: 'SnByteArray',
        decoded: 'SnSensioClaim[]',
      },
      {
        data: 'SnByteArray',
        decoded: 'SnSigner',
      },
    ],
    output: {
      desc: 'Return the tuple of claims and their signatures',
      output: 'SnByteArray',
      decoded: '[SnSensioClaim[],SnSensioSignatures[]]',
    },
    groups: [5],
    priority: 0,
    hashingOp: 'sn_cid',
    encOp: 'sn_enc_hex',
    ops: [],
  },
}

export default op