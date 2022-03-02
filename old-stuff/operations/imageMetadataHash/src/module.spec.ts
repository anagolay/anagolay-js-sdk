import esmDirname from '@anagolay/util/esm/esmDirname'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { resolve } from 'path'
import execute from '.'

beforeEach(() => {
  jest.useFakeTimers()
})

describe('AnOperation: imageMetadataHash', (): void => {
  it.skip('should return correct response', async (): Promise<void> => {
    const path = resolve(esmDirname(import.meta.url), '../../../assets/test-images/01.jpg')
    const thisImageMetadataCID = 'bafyb4iewah7wuuic7nv3smefgwmi7c67q32citfwio3cfz5jylu5bdiwwe'
    const res = await execute([
      {
        data: path,
        decode: () => path,
      },
    ])

    expect(res.decode()).toEqual(thisImageMetadataCID)
  })
})
