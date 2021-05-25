import { executeOperation } from '@anagolay/core'
import { AnOperation } from '@anagolay/types'
import config from './config'
import { InputParams, ReturnParams } from './interfaces'

/**
 * Take the photo of the QRCode and do the verification of equality. If the verification is a successes the coperation will continue, if not user will be asked to resubmit the image. The photo taken MUST NOT BE MODIFIED, RESIZED AND MUST BE IN JPG OR JPEG. Medium or low size is better than large 10MB files. You can choose that in the camera settings
 * @typeParam T Type `T` is generic and it is used to get the latest child operation. With default export use generic type so this operation can be executed from the leaf child
 * @return output (Return the QRCode data if it passes the decoding and verification.) and decoder function
 */
export default async function execute<T>(params: T): Promise<ReturnParams> {
  const c: AnOperation = config

  return await executeOperation<T, ReturnParams>(c, params)
}

/**
 * Take the photo of the QRCode and do the verification of equality. If the verification is a successes the coperation will continue, if not user will be asked to resubmit the image. The photo taken MUST NOT BE MODIFIED, RESIZED AND MUST BE IN JPG OR JPEG. Medium or low size is better than large 10MB files. You can choose that in the camera settings
 * @param params InputParams what this method expects
 * @return output (Return the QRCode data if it passes the decoding and verification.) and decoder function
 */
export async function takePhotoAndUploadQrcode(params: InputParams): Promise<ReturnParams> {
  const inputLength = config.data.input.length
  // start implementation here
  // console.log('takePhotoAndUploadQrcode', params)
  const data = params[inputLength - 1]

  return {
    data: data.data,
    decode: () => 'CHANGE_ME',
  }
}
