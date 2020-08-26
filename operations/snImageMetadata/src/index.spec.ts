import snFile from '@sensio/op-sn-file'
import { resolve } from 'path'
import execute, { snImageMetadata } from '.'

const testImage = resolve(__dirname, '../../../assets/test-images/01.jpg')

describe('SnOperation: snImageMetadata', (): void => {
  it('is defined', (): void => {
    expect(snImageMetadata).toBeDefined()
  })
  it('should return correct metadata', async (): Promise<void> => {
    const res = await execute([
      {
        data: testImage,
        decode: () => testImage
      }
    ])
    const decoded = res.decode()

    expect(decoded.exif?.Make.description).toBe('Canon')
    expect(decoded.exif?.Make.value).toEqual(['Canon'])
  })
  it('should return correct metadata for main function', async (): Promise<
  void
  > => {
    const file = await snFile([
      {
        data: testImage,
        decode: () => testImage
      }
    ])
    const res = await snImageMetadata([file])
    const decoded = res.decode()

    expect(decoded.exif?.Make.description).toBe('Canon')
    expect(decoded.exif?.Make.value).toEqual(['Canon'])
  })
  it('should properly handle no metadata', async (): Promise<void> => {
    const file = await snFile([
      {
        data: resolve(__dirname, '../../../assets/test-images/no-metadata.jpg'),
        decode: () =>
          resolve(__dirname, '../../../assets/test-images/no-metadata.jpg')
      }
    ])
    const res = await snImageMetadata([file])
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

    const file = await snFile([
      {
        data: resolve(__dirname, '../../../assets/test-images/notAnImage.jpg'),
        decode: () =>
          resolve(__dirname, '../../../assets/test-images/notAnImage.jpg')
      }
    ])
    try {
      await snImageMetadata([file])
    } catch (error) {
      expect(error.message).toBe('Invalid image format')
    }
  })
})
