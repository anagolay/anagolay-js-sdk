import { executeOperation } from '@anagolay/core'
import { AnImageMetadata, AnOperation } from '@anagolay/types'
import ExifReader from 'exifreader'
import config from './config'
import { InputParam0, InputParams, ReturnParams } from './interfaces'

/**
 * Extract All Image Metadata
 * @typeParam T Type `T` is generic and it is used to get the latest child operation. With default export use generic type so this operation can be executed from the leaf child
 * @return  output (Returns the metadata as AnByteArray and decoded as imageMetadata. Accessible as `[exif|iptc|xmp|icc].TAG_NAME`) and decoder function
 */
export default async function execute<T>(params: T): Promise<ReturnParams> {
  const c: AnOperation = config

  return await executeOperation<T, ReturnParams>(c, params)
}

export async function imageMetadata(params: InputParams): Promise<ReturnParams> {
  const inputLength = config.data.input.length

  const data = params[inputLength - 1]

  async function result(data: InputParam0) {
    // need to cast like this since the original doesn't include `file` property at all
    // this approach fixes the error
    // may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
    const exif = ExifReader.load(data.decode(), {
      expanded: true,
    }) as unknown

    return {
      data: Buffer.from(JSON.stringify(exif)),
      decode: () => exif as AnImageMetadata,
    }
  }

  return await result(data)
}
