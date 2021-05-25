/**
 * Operation specification
 */
import { AnOperation } from '@anagolay/types'

export const op: AnOperation = {
  id: 'bafymbzacic4pchdgdzwdvep6xlbgbqa2lzd4gwspe4vrstdlsfjc7wd73bvfoadfj5bvle4pkhst4ikvwqqgsqt6eesjugsyjcd3yfp2q4pp6b23',
  data: {
    desc: 'Perceptual hash calculation, currently implementing http://blockhash.io/',
    name: 'image_phash',
    input: [
      {
        data: 'AnByteArray',
        decoded: 'AnFileBuffer',
      },
    ],
    output: {
      desc: 'Return binary representation of phash 0011101011',
      output: 'AnByteArray',
      decoded: 'AnString',
    },
    groups: [6],
    priority: 1,
    hashingOp: 'cid',
    encOp: 'enc_hex',
    ops: [
      {
        id: 'bafymbzacidlcfuzfgebefbik37c47655r3r426tcjgzbrct27tx2umsgax6v5somvlnrtqxi3tqcm6llr4wbrrefdpv2wt3abvq5evh4lvttydya',
        data: {
          name: 'file',
          desc: 'Reads the file from given path (data) and returns the buffer. RAW file buffer for other ops to use.',
          input: [
            {
              data: 'StringOrBuffer',
              decoded: 'StringOrBuffer',
            },
          ],
          groups: [6, 1],
          priority: 0,
          output: {
            desc: 'Returns the File Buffer.',
            output: 'AnByteArray',
            decoded: 'AnFileBuffer',
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
