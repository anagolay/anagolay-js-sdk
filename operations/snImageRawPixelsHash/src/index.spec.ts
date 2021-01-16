import execute, { snImageRawPixelsHash, config } from '.'

describe('SnOperation: snImageRawPixelsHash', (): void => {
  it('is default defined', (): void => {
    expect(execute).toBeDefined()
  })
  it('is snImageRawPixelsHash defined', (): void => {
    expect(snImageRawPixelsHash).toBeDefined()
  })
  it('is config defined', (): void => {
    expect(config).toBeDefined()
  })
})
