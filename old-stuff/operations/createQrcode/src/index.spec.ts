import execute, { config, createQrcode } from '.'

describe('AnOperation: createQrcode', (): void => {
  it('is default defined', (): void => {
    expect(execute).toBeDefined()
  })
  it('is createQrcode defined', (): void => {
    expect(createQrcode).toBeDefined()
  })
  it('is config defined', (): void => {
    expect(config).toBeDefined()
  })
})
