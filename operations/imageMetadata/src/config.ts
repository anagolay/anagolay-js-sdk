/**
 * Operation specification
 */
import { AnOperation } from '@anagolay/types'

export const op: AnOperation = {
  id: 'bafymbzacicdfstmrb555hb6yhhtaznotphlhtf64fdutmbw773syngw4i37je4hz7po6shnwdrzywe5ip4lx5hzzjleo4vslruhsucku5p2f4l5h',
  data: {
    desc: 'Extract All Image Metadata',
    name: 'image_metadata',
    input: [
      {
        data: 'AnByteArray',
        decoded: 'AnFileBuffer',
      },
    ],
    output: {
      desc: 'Returns the metadata as AnByteArray and decoded as AnImageMetadata. Accessible as `[exif|iptc|xmp|icc].TAG_NAME`',
      output: 'AnByteArray',
      decoded: 'AnImageMetadata',
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
