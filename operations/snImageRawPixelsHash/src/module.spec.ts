import snCid from '@sensio/op-sn-cid'
import { resolve } from 'path'
import execute, { snImageRawPixelsHash } from '.'
const path = resolve(__dirname, '../../../assets/test-images/01.jpg')

describe('SnOperation: snImageRawPixelsHash', (): void => {
  it('is default defined', (): void => {
    expect(execute).toBeDefined()
  })
  it('is snImageRawPixelsHash defined', (): void => {
    expect(snImageRawPixelsHash).toBeDefined()
  })
  it('should return correct content id', async (): Promise<void> => {
    const params = [
      {
        data: path,
        decode: () => path,
      },
    ]
    const res = await execute(params)
    const cidOfTheFile = await snCid(params)

    // they shouldn't be equal, the snCid will calculate the hash of the file, and this op the hash of the raw pixels
    expect(res.decode()).not.toEqual(cidOfTheFile.decode())
  })
})
