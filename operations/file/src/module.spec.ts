import esmDirname from '@anagolay/util/esm/esmDirname'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { file } from '.'

beforeEach(() => {
  jest.resetAllMocks()
  jest.useFakeTimers()
})

const __dirname = esmDirname(import.meta.url)

describe('Operation: file', (): void => {
  it('is should return proper file', async (): Promise<void> => {
    const path = resolve(__dirname, './index.ts')
    const nodeFile = readFileSync(path)
    const s = await file([
      {
        data: resolve(__dirname, './index.ts'),
        decode: () => resolve(__dirname, './index.ts'),
      },
    ])

    expect(s.data.length).toBe(nodeFile.length)
    expect(s.decode()).toEqual(nodeFile)
  })
})
