import { u8aToU8a } from '@polkadot/util'
import { SnForWhat, SnImageMetadata } from '@sensio/types'
import ExifReader from 'exifreader'
import config from './config'
import { InputParams, ReturnParams } from './interfaces'

/**
 * @function snImageMetadata
 * @description Extract All Image Metadata
 * @param {InputParams} params InputParams
 * @return {Promise<ReturnParams>} output (Returns the metadata as SnByteArray and decoded as SnImageMetadata. Accessible as `[exif|iptc|xmp|icc].TAG_NAME`) and decoder function
 */
export default async function snImageMetadata (
  params: InputParams
): Promise<ReturnParams> {
  const inputLength = config.data.input.length
  const fcOpType = config.data.groups.includes(SnForWhat.FLOWCONTROL)

  if (!fcOpType && params.length !== inputLength) {
    throw new Error('Got wrong amount of inputs.')
  }

  if (inputLength === 1) {
    const data = params[inputLength - 1]

    try {
      // need to cast like this since the original doesn't include `file` property at all
      // this approach fixes the error
      // may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
      const exif = ExifReader.load(data.decode(), {
        expanded: true
      }) as unknown

      return {
        data: u8aToU8a(JSON.stringify(exif)),
        decode: () => exif as SnImageMetadata
      }
    } catch (error) {
      throw new Error(error.message)
    }
  } else {
    throw new Error("This operation doesn't support more than one input param ")
  }
}
