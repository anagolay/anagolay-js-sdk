import identity, { config } from '.'

describe('AnOperation: identity', (): void => {
  it('is identity defined', (): void => {
    expect(identity).toBeDefined()
  })
  it('is config defined', (): void => {
    expect(config).toBeDefined()
  })
})
