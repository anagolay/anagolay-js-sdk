import execute, { config, imageMetadata } from '.'

describe('AnOperation: imageMetadata', (): void => {
  it('is default defined', (): void => {
    expect(execute).toBeDefined()
  })
  it('is imageMetadata defined', (): void => {
    expect(imageMetadata).toBeDefined()
  })
  it('is config defined', (): void => {
    expect(config).toBeDefined()
  })
})
