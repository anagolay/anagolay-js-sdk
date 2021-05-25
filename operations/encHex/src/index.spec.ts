import execute, { config, encHex } from '.'

describe('AnOperation: encHex', (): void => {
  it('is default defined', (): void => {
    expect(execute).toBeDefined()
  })
  it('is encHex defined', (): void => {
    expect(encHex).toBeDefined()
  })
  it('is config defined', (): void => {
    expect(config).toBeDefined()
  })
})
