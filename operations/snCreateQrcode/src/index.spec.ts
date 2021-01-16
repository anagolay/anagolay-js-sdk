import execute, { snCreateQrcode, config } from '.'

describe('SnOperation: snCreateQrcode', (): void => {
  it('is default defined', (): void => {
    expect(execute).toBeDefined()
  })
  it('is snCreateQrcode defined', (): void => {
    expect(snCreateQrcode).toBeDefined()
  })
  it('is config defined', (): void => {
    expect(config).toBeDefined()
  })
})
