import execute, { snEncHex, config } from '.'

describe('SnOperation: snEncHex', (): void => {
  it('is default defined', (): void => {
    expect(execute).toBeDefined()
  })
  it('is snEncHex defined', (): void => {
    expect(snEncHex).toBeDefined()
  })
  it('is config defined', (): void => {
    expect(config).toBeDefined()
  })
})
