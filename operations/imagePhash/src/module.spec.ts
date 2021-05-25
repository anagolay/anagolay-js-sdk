import file from '@anagolay/op-file'
import esmDirname from '@anagolay/util/esm/esmDirname'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import execute, { imagePhash } from '.'

const __dirname = esmDirname(import.meta.url)

beforeEach(() => {
  jest.useFakeTimers()
})

describe('AnOperation: imagePhash', (): void => {
  it('should return proper output, default', async (): Promise<void> => {
    const path = resolve(__dirname, '../../../assets/test-images/01.jpg')
    const res = await execute([
      {
        data: path,
        decode: () => path,
      },
    ])

    expect(res).toBeDefined()
    expect(res.decode()).toEqual('1111111000010000111111110000000001000000110111111100000011101110')
  })
  it('should return proper output for method imagePhash', async (): Promise<void> => {
    const path = resolve(__dirname, '../../../assets/test-images/01.jpg')
    const testDecode = readFileSync(path)
    const fileResult = await file([
      {
        data: path,
        decode: () => path,
      },
    ])

    expect(fileResult.decode()).toEqual(testDecode)

    const res = await imagePhash([fileResult])

    expect(res.decode()).toBeDefined()
    expect(res.decode()).toEqual('1111111000010000111111110000000001000000110111111100000011101110')
  })
})
