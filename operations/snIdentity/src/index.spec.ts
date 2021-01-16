import snIdentity, { config } from '.'

describe('SnOperation: snIdentity', (): void => {
  it('is snIdentity defined', (): void => {
    expect(snIdentity).toBeDefined()
  })
  it('is config defined', (): void => {
    expect(config).toBeDefined()
  })
})
