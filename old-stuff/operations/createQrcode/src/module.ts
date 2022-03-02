/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { executeOperation } from '@anagolay/core'
import { AnOperation } from '@anagolay/types'
import { stringToU8a } from '@anagolay/util'
import qrcode, { QRCodeToDataURLOptions } from 'qrcode'
import config from './config'
import { InputParams, ReturnParams } from './interfaces'

/**
 * Create QR Code
 * @typeParam T Type `T` is generic and it is used to get the latest child operation. With default export use generic type so this operation can be executed from the leaf child
 * @return output (Return QRCode image) and decoder function
 */
export default async function execute<T>(params: T): Promise<ReturnParams> {
  const c: AnOperation = config

  return await executeOperation<T, ReturnParams>(c, params)
}

/**
 * Create QR Code
 * @param {InputParams} params InputParams
 * @return output (Return QRCode image) and decoder function
 */
export async function createQrcode(params: InputParams): Promise<ReturnParams> {
  const inputLength = config.data.input.length
  const data = params[inputLength - 1]

  const opts: QRCodeToDataURLOptions = {
    errorCorrectionLevel: 'L',
    version: 7,
    // quality: 1,
    margin: 4,
  }
  const retData = (await qrcode.toDataURL(data.decode(), opts)) as unknown as string

  return {
    data: stringToU8a(retData),
    decode: () => retData,
  }
}
