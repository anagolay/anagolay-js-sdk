import { getImageData, imageFromBuffer } from '@canvas/image'
import { stringToU8a } from '@polkadot/util'
import { executeOperation } from '@sensio/core/execution'
import { SnOperation } from '@sensio/types'
import config from './config'
import { InputParams, ReturnParams } from './interfaces'

/**
 * Extract Only Raw pixels from the image
 * @typeParam T Type `T` is generic and it is used to get the latest child operation. With default export use generic type so this operation can be executed from the leaf child
 * @return  output (Returns the raw pixel bytes without metadata`) and decoder function
 */
export default async function execute<T> (params: T): Promise<ReturnParams> {
  const inputLength = config.data.input.length

  if (inputLength === 1) {
    const c: SnOperation = config
    return executeOperation<T, ReturnParams>(c, params)
  } else {
    throw new Error("This operation doesn't support more than one input param ")
  }
}

/**
 * Extract Only Raw pixels from the image
 * @param {InputParams} params InputParams
 * @return  output (Returns the raw pixel bytes without metadata`) and decoder function
 */
export async function snImageRawPixels (
  params: InputParams
): Promise<ReturnParams> {
  const inputLength = config.data.input.length

  const data = params[inputLength - 1]
  const image = await imageFromBuffer(data.decode())
  const imageData = getImageData(image)

  if (imageData === undefined) {
    throw new Error('image cannot be read')
  }

  /**
   * now the weird part, need to serialize the imageData to json then transform to U8intArray, anyways we are not using this `data` field at all, it is defined in protocol but i can't find a good use for it. so it really doesn't matter
   */
  return {
    data: stringToU8a(JSON.stringify(imageData)),
    decode: () => imageData
  }
}
