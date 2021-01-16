import execute, { snFile, config } from '.'

describe('SnOperation: snFile', (): void => {
  it('is default defined', (): void => {
    expect(execute).toBeDefined()
  })
  it('is snFile defined', (): void => {
    expect(snFile).toBeDefined()
  })
  it('is config defined', (): void => {
    expect(config).toBeDefined()
  })
})
