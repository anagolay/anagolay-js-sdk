import esmDirname from '@anagolay/util/esm/esmDirname'
import { getImageData, imageFromBuffer } from '@canvas/image'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import execute from '.'

const __dirname = esmDirname(import.meta.url)

beforeEach(() => {
  jest.resetAllMocks()
  jest.useFakeTimers()
})

const testImage = resolve(__dirname, '../../../assets/test-images/01.jpg')

describe('AnOperation: imageRawPixels', (): void => {
  it('should return correct data', async (): Promise<void> => {
    jest.resetAllMocks()

    const res = await execute([
      {
        data: testImage,
        decode: () => testImage,
      },
    ])
    const decoded = res.decode()
    const expectedImageBuffer = await imageFromBuffer(readFileSync(testImage))
    const expectedImage = getImageData(expectedImageBuffer)

    expect(decoded).toEqual(expectedImage)
  })
  it('should return correct error on file does not exist', async (): Promise<void> => {
    expect.assertions(1)
    jest.resetAllMocks()

    try {
      await execute([
        {
          data: testImage + '1',
          decode: () => testImage + '1',
        },
      ])
    } catch (error) {
      expect(error.message).toContain('no such file or directory')
    }
  })
  it('should return correct error on wrong type', async (): Promise<void> => {
    expect.assertions(1)
    jest.resetAllMocks()

    try {
      await execute([
        {
          data: resolve(__dirname, './index.ts'),
          decode: () => resolve(__dirname, './index.ts'),
        },
      ])
    } catch (error) {
      expect(error.message).toContain('Unknown file format')
    }
  })
})
