import execute, { config, imageRawPixels } from '.'

describe('AnOperation: imageRawPixels', (): void => {
  it('is default defined', (): void => {
    expect(execute).toBeDefined()
  })
  it('is imageRawPixels defined', (): void => {
    expect(imageRawPixels).toBeDefined()
  })
  it('is config defined', (): void => {
    expect(config).toBeDefined()
  })
})
