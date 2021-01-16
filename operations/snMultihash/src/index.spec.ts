import execute, { snMultihash, config } from '.'

describe('SnOperation: snMultihash', (): void => {
  it('is default defined', (): void => {
    expect(execute).toBeDefined()
  })
  it('is snMultihash defined', (): void => {
    expect(snMultihash).toBeDefined()
  })
  it('is config defined', (): void => {
    expect(config).toBeDefined()
  })
})
