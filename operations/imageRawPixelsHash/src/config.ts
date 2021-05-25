/**
 * Operation specification
 */
import { AnOperation } from '@anagolay/types'

export const op: AnOperation = {
  id: 'bafymbzacia3f2qxlda6d5jx4joghg3mazjdnhtxug7kwbd3degej36ikgukqp47re6xqfhbpav7lesjlxmstzkitfoc4m4oeuemf44b2dquxi6ii',
  data: {
    desc: 'Calculate content id of the raw pixels',
    name: 'image_raw_pixels_hash',
    input: [
      {
        data: 'AnByteArray',
        decoded: 'AnImageData',
      },
    ],
    output: {
      desc: 'Return content id of the raw pixels',
      output: 'AnByteArray',
      decoded: 'AnString',
    },
    groups: [6],
    priority: 2,
    hashingOp: 'cid',
    encOp: 'enc_hex',
    ops: [
      {
        id: 'bafymbzacic5p24bwizfnn75joc3tg3anx5gjbrzwzhnkmraz2hgbek4zeqxkjxk4vpkzyd4r5zeykxvnllnf27ynyvhfxytunbklne5nde4xbgqd',
        data: {
          desc: 'Extract Only Raw pixels from the image',
          name: 'image_raw_pixels',
          input: [
            {
              data: 'AnByteArray',
              decoded: 'AnFileBuffer',
            },
          ],
          output: {
            desc: 'Returns the raw pixel bytes without metadata',
            output: 'AnByteArray',
            decoded: 'AnImageData',
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
