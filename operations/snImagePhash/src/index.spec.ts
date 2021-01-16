import execute, { snImagePhash, config } from '.'

describe('SnOperation: snImagePhash', (): void => {
  it('is default defined', (): void => {
    expect(execute).toBeDefined()
  })
  it('is snImagePhash defined', (): void => {
    expect(snImagePhash).toBeDefined()
  })
  it('is config defined', (): void => {
    expect(config).toBeDefined()
  })
})
