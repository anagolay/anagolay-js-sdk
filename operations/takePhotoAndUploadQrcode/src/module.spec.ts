/* eslint-disable @typescript-eslint/no-explicit-any */
import imageMetadata from '@anagolay/op-image-metadata'
import esmDirname from '@anagolay/util/esm/esmDirname'
import { beforeAll, describe, expect, it, jest } from '@jest/globals'
import { readFileSync } from 'fs'
import Jimp from 'jimp'
import jsQR from 'jsqr'
import { resolve } from 'path'

const __dirname = esmDirname(import.meta.url)

jest.setTimeout(20000)

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
}, 20000)

describe('AnOperation: takePhotoAndUploadQrcode.module', (): void => {
  it.skip('UI -- implement this -- should pass when qrcode are the same', async (): Promise<void> => {
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
  it.skip('UI -- implement this -- should pass when taken with the same equipment', async (): Promise<void> => {
    const metadata = await imageMetadata([
      {
        data: verificationImage,
        decode: () => verificationImage,
      },
    ])
    const d = metadata.decode()

    expect(d?.exif?.BodySerialNumber.description).toBe(cameraSerialNumber)
  })
})
