/**
 * Operation specification
 */
import { SnOperation } from '@sensio/types'

export const op: SnOperation = {
  id: 'bafy2bzacebvd3b7upai2av3w33dwrwqkh7w7qvbon6obi6q4evw6pqe744npu',
  data: {
    name: 'sn_cid',
    desc: 'Generic CID, defaults to base32 and dag-cbor for Any kind of data.',
    input: [
      {
        data: 'SnByteArray',
        decoded: 'SnBuffer',
      },
    ],
    groups: [6],
    priority: 1,
    output: {
      desc: 'CID string converted into SnByteArray',
      output: 'SnByteArray',
      decoded: 'SnString',
    },
    hashingOp: '',
    encOp: '',
    ops: [
      {
        id: 'bafy2bzacea24txwqzwanzte5laqhsy3umk4wq43h3llvlvkebp7gv73kzuzsi',
        data: {
          name: 'sn_multihash',
          desc: 'Generic blake2b-256 multihash operation.',
          input: [
            {
              data: 'SnByteArray',
              decoded: 'SnAny',
            },
          ],
          groups: [6],
          priority: 0,
          output: {
            desc: 'Returns the Multihash buffer as SnByteArray.',
            output: 'SnByteArray',
            decoded: 'SnBuffer',
          },
          hashingOp: 'sn_cid',
          encOp: 'sn_enc_hex',
          ops: [],
        },
      },
    ],
  },
}

export default op
