import execute, { snImageRawPixels, config } from '.'

describe('SnOperation: snImageRawPixels', (): void => {
  it('is default defined', (): void => {
    expect(execute).toBeDefined()
  })
  it('is snImageRawPixels defined', (): void => {
    expect(snImageRawPixels).toBeDefined()
  })
  it('is config defined', (): void => {
    expect(config).toBeDefined()
  })
})
