import execute, { snImageMetadataHash, config } from '.'

describe('SnOperation: snImageMetadataHash', (): void => {
  it('is default defined', (): void => {
    expect(execute).toBeDefined()
  })
  it('is snImageMetadataHash defined', (): void => {
    expect(snImageMetadataHash).toBeDefined()
  })
  it('is config defined', (): void => {
    expect(config).toBeDefined()
  })
})
