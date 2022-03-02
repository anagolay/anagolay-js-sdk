/**
 * Operation specification
 */
import { AnOperation } from '@anagolay/types'

export const op: AnOperation = {
  id: 'bafymbzacicuqxa54sfqahqis7pswv4edyqrcvf7gj2hcvwikmibl3z6cfsirx3bqq6dfowcawspuzbobexjscmpnikttcvej3vdsotqacujzblbb',
  data: {
    name: 'image_metadata_hash',
    desc: 'Hash of full unchanged metadata buffer (or similar). Without raw pixels. The hashing is done via multihash using the hashing key to create a hash. Figure out how to do it with the ops that are not children, like use cid',
    input: [
      {
        data: 'AnByteArray',
        decoded: 'AnImageMetadata',
      },
    ],
    output: {
      desc: 'Hash of full unchanged metadata buffer (or similar). Without raw pixels',
      output: 'AnByteArray',
      decoded: 'AnGenericId',
    },
    groups: [6],
    priority: 2,
    hashingOp: 'cid',
    encOp: 'enc_hex',
    ops: [
      {
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
      },
    ],
  },
}

export default op
