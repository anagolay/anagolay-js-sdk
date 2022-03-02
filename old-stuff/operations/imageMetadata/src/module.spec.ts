import { file } from '@anagolay/op-file'
import esmDirname from '@anagolay/util/esm/esmDirname'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { resolve } from 'path'
import execute, { imageMetadata } from '.'

const __dirname = esmDirname(import.meta.url)

beforeEach(() => {
  jest.resetAllMocks()
  jest.useFakeTimers()
})

const testImage = resolve(__dirname, '../../../assets/test-images/01.jpg')

describe('AnOperation: imageMetadata', (): void => {
  it.skip('should return correct metadata', async (): Promise<void> => {
    const res = await execute([
      {
        data: testImage,
        decode: () => testImage,
      },
    ])

    // console.log('imagemetadata res', res)
    const decoded = res.decode()

    expect(decoded.exif?.Make.description).toBe('Canon')
    expect(decoded.exif?.Make.value).toEqual(['Canon'])
  })
  it('should return correct metadata for main function', async (): Promise<void> => {
    const fileResult = await file([
      {
        data: testImage,
        decode: () => testImage,
      },
    ])
    const res = await imageMetadata([fileResult])
    const decoded = res.decode()

    expect(decoded.exif?.Make.description).toBe('Canon')
    expect(decoded.exif?.Make.value).toEqual(['Canon'])
  })
  it('should properly handle no metadata', async (): Promise<void> => {
    const fileResult = await file([
      {
        data: resolve(__dirname, '../../../assets/test-images/no-metadata.jpg'),
        decode: () => resolve(__dirname, '../../../assets/test-images/no-metadata.jpg'),
      },
    ])
    const res = await imageMetadata([fileResult])
    const decoded = res.decode()

    expect(decoded).toHaveProperty('file')
    expect(decoded.exif).toBeUndefined()
    expect(decoded.icc).toBeUndefined()
    expect(decoded.iptc).toBeUndefined()
    expect(decoded.xmp).toBeUndefined()
  })

  it('should fail on wrong image', async (): Promise<void> => {
    expect.assertions(1)
    // try changing extension to `txt`😃

    const fileResult = await file([
      {
        data: resolve(__dirname, '../../../assets/test-images/notAnImage.jpg'),
        decode: () => resolve(__dirname, '../../../assets/test-images/notAnImage.jpg'),
      },
    ])

    try {
      await imageMetadata([fileResult])
    } catch (error) {
      expect(error.message).toBe('Invalid image format')
    }
  })
})
