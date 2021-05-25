import cid from '@anagolay/op-cid'
import esmDirname from '@anagolay/util/esm/esmDirname'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { resolve } from 'path'
import execute from '.'

beforeEach(() => {
  jest.resetAllMocks()
  jest.useFakeTimers()
})

const path = resolve(esmDirname(import.meta.url), '../../../assets/test-images/01.jpg')

describe('AnOperation: imageRawPixelsHash', (): void => {
  it.skip('should return correct content id', async (): Promise<void> => {
    const params = [
      {
        data: path,
        decode: () => path,
      },
    ]
    const res = await execute(params)

    jest.clearAllMocks()
    const cidOfTheFile = await cid(params)

    // they shouldn't be equal, the cid will calculate the hash of the file, and this op the hash of the raw pixels
    expect(res.decode()).not.toEqual(cidOfTheFile.decode())
  })
})
