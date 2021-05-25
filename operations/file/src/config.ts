/**
 * Operation specification
 */
import { AnOperation } from '@anagolay/types'

export const op: AnOperation = {
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
}

export default op
