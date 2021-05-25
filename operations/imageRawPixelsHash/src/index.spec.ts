import execute, { config, imageRawPixelsHash } from '.'

describe('AnOperation: imageRawPixelsHash', (): void => {
  it('is default defined', (): void => {
    expect(execute).toBeDefined()
  })
  it('is imageRawPixelsHash defined', (): void => {
    expect(imageRawPixelsHash).toBeDefined()
  })
  it('is config defined', (): void => {
    expect(config).toBeDefined()
  })
})
