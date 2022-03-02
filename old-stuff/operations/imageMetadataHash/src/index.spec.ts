import execute, { config, imageMetadataHash } from '.'

describe('AnOperation: imageMetadataHash', (): void => {
  it('is default defined', (): void => {
    expect(execute).toBeDefined()
  })
  it('is imageMetadataHash defined', (): void => {
    expect(imageMetadataHash).toBeDefined()
  })
  it('is config defined', (): void => {
    expect(config).toBeDefined()
  })
})
