import execute, { config, saveStatements } from '.'

describe('AnOperation: saveStatements.index', (): void => {
  it('is default defined', (): void => {
    expect(execute).toBeDefined()
  })
  it('is saveStatements defined', (): void => {
    expect(saveStatements).toBeDefined()
  })
  it('is config defined', (): void => {
    expect(config).toBeDefined()
  })
})
