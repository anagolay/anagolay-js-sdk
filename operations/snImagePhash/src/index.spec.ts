import snFile from '@sensio/op-sn-file'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import execute, { snImagePhash } from '.'

describe('SnOperation: snImagePhash', (): void => {
  it('is defined', (): void => {
    expect(snImagePhash).toBeDefined()
  })
  it('should return proper output, default', async (): Promise<void> => {
    const path = resolve(__dirname, '../../../assets/test-images/01.jpg')
    const res = await execute([
      {
        data: path,
        decode: () => path
      }
    ])
    expect(res).toBeDefined()
    expect(res.decode()).toEqual(
      '1111111000010000111111110000000001000000110111111100000011101110'
    )
  })
  it('should return proper output for method snImagePhash', async (): Promise<
  void
  > => {
    const path = resolve(__dirname, '../../../assets/test-images/01.jpg')
    const testDecode = readFileSync(path)
    const file = await snFile([
      {
        data: path,
        decode: () => path
      }
    ])

    expect(file.decode()).toEqual(testDecode)

    const res = await snImagePhash([file])
    expect(res.decode()).toBeDefined()
    expect(res.decode()).toEqual(
      '1111111000010000111111110000000001000000110111111100000011101110'
    )
  })
})
