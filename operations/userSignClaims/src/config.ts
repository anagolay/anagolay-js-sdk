/**
 * Operation specification
 */
import { AnOperation } from '@anagolay/types'

export const op: AnOperation = {
  id: 'bafymbzacibu7zklvaxvz3efvcmnbkxipzquwqjuze7gcoo3dmbsu3axhmdqy53klevdal5vy3qggrzwqkf3tc33lcbargrcrtv3egg5abranyczp',
  data: {
    desc: 'Sign the claims and return the tuple of claims and their signatures',
    name: 'user_sign_claims',
    input: [
      {
        data: 'AnByteArray',
        decoded: 'AnAnagolayClaim[]',
      },
      {
        data: 'AnByteArray',
        decoded: 'AnSigner',
      },
    ],
    output: {
      desc: 'Return the tuple of claims and their signatures',
      output: 'AnByteArray',
      decoded: '[AnAnagolayClaim[],AnAnagolaySignatures[]]',
    },
    groups: [5],
    priority: 0,
    hashingOp: 'cid',
    encOp: 'enc_hex',
    ops: [],
  },
}

export default op
