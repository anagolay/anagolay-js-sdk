import execute, { snSaveStatements, config } from '.'

describe('SnOperation: snSaveStatements', (): void => {
  it('is default defined', (): void => {
    expect(execute).toBeDefined()
  })
  it('is snSaveStatements defined', (): void => {
    expect(snSaveStatements).toBeDefined()
  })
  it('is config defined', (): void => {
    expect(config).toBeDefined()
  })
})
