import execute, { config, multihash } from '.'

describe('AnOperation: multihash', (): void => {
  it('is default defined', (): void => {
    expect(execute).toBeDefined()
  })
  it('is multihash defined', (): void => {
    expect(multihash).toBeDefined()
  })
  it('is config defined', (): void => {
    expect(config).toBeDefined()
  })
})
