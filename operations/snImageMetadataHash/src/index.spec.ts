import { resolve } from 'path'
import execute, { snImageMetadataHash } from '.'

describe('SnOperation: snImageMetadataHash', (): void => {
  it('is defined', (): void => {
    expect(snImageMetadataHash).toBeDefined()
  })
  it('should return correct response', async (): Promise<void> => {
    const path = resolve(__dirname, '../../../assets/test-images/01.jpg')
    const thisImageMetadataCID =
      'bafy2bzacedghjbfb56nsao3jro6wakumzgyaczko37y462byo74cgmqxic6ci'
    const res = await execute([
      {
        data: path,
        decode: () => path
      }
    ])
    expect(res.decode()).toEqual(thisImageMetadataCID)
  })
})
