/* eslint-disable @typescript-eslint/no-explicit-any */
import snImageMetadata from '@sensio/op-sn-image-metadata'
import { readFileSync } from 'fs'
import Jimp from 'jimp'
import jsQR from 'jsqr'
import { resolve } from 'path'
import execute, { snTakePhotoAndUploadQrcode } from '.'

let originalImage: Buffer
let verificationImage: Buffer
let decodedVerification: any
let decodedOriginal: any

const cameraSerialNumber = '083031034346'

beforeAll(async () => {
  originalImage = readFileSync(resolve(__dirname, '../../../assets/test-images/7-as-qrcode.png'))
  verificationImage = readFileSync(
    resolve(__dirname, '../../../assets/test-images/7-qrcode-verificationImage.JPG'),
  )
  decodedVerification = await Jimp.read(verificationImage)
  decodedOriginal = await Jimp.read(originalImage)
})

describe('SnOperation: snTakePhotoAndUploadQrcode', (): void => {
  it('is default defined', (): void => {
    expect(execute).toBeDefined()
  })

  it('is snTakePhotoAndUploadQrcode defined', (): void => {
    expect(snTakePhotoAndUploadQrcode).toBeDefined()
  })
  it('UI -- implement this -- should pass when qrcode are the same', async (): Promise<void> => {
    const qrcodeVerification = jsQR(
      decodedVerification.bitmap.data,
      decodedVerification.bitmap.width,
      decodedVerification.bitmap.height,
    )

    const qrcodeOriginal = jsQR(
      decodedOriginal.bitmap.data,
      decodedOriginal.bitmap.width,
      decodedOriginal.bitmap.height,
    )

    expect(qrcodeOriginal?.data).toBe(qrcodeVerification?.data)
  })
  it('UI -- implement this -- should pass when taken with the same equipment', async (): Promise<
    void
  > => {
    const metadata = await snImageMetadata([
      {
        data: verificationImage,
        decode: () => verificationImage,
      },
    ])
    const d = metadata.decode()
    expect(d?.exif?.BodySerialNumber.description).toBe(cameraSerialNumber)
  })
})
