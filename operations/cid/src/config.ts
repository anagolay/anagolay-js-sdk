/**
 * Operation specification
 */
import { AnOperation } from '@anagolay/types'

export const op: AnOperation = {
  id: 'bafymbzacidtsdjfehszh2vqudmraf5phevmqbjl5fnlfhpc6eqwopdzninhdov3r64mpnaoyeu6hjulnrmgttha4pddyny3zyjv6utoddozql3p7',
  data: {
    name: 'cid',
    desc: 'Generic CID, defaults to base32 and dag-cbor for Any kind of data.',
    input: [
      {
        data: 'AnByteArray',
        decoded: 'AnBuffer',
      },
    ],
    groups: [6],
    priority: 1,
    output: {
      desc: 'CID string converted into AnByteArray',
      output: 'AnByteArray',
      decoded: 'AnString',
    },
    hashingOp: '',
    encOp: '',
    ops: [
      {
        id: 'bafymbzaciblqfohl5zvrptml7qgoihozctdaw3sj5sp37hjj4kzgnhusretoetgquhgdloomtcz4kac7f722ajjlbdcr2tvbbkvk4dwmpdi5ykdo',
        data: {
          name: 'multihash',
          desc: 'Generic blake2b-256 multihash operation.',
          input: [
            {
              data: 'AnByteArray',
              decoded: 'AnAny',
            },
          ],
          groups: [6],
          priority: 0,
          output: {
            desc: 'Returns the Multihash buffer as AnByteArray.',
            output: 'AnByteArray',
            decoded: 'AnBuffer',
          },
          hashingOp: 'cid',
          encOp: 'enc_hex',
          ops: [],
        },
      },
    ],
  },
}

export default op
