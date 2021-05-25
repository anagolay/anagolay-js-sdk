import execute, { config, file } from '.'

describe('AnOperation: file', (): void => {
  it('is default defined', (): void => {
    expect(execute).toBeDefined()
  })
  it('is file defined', (): void => {
    expect(file).toBeDefined()
  })
  it('is config defined', (): void => {
    expect(config).toBeDefined()
  })
})
