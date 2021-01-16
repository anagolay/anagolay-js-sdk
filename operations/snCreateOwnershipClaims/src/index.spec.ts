import execute, { snCreateOwnershipClaims, config } from '.'

describe('SnOperation: snCreateOwnershipClaims', (): void => {
  it('is default defined', (): void => {
    expect(execute).toBeDefined()
  })
  it('is snCreateOwnershipClaims defined', (): void => {
    expect(snCreateOwnershipClaims).toBeDefined()
  })
  it('is config defined', (): void => {
    expect(config).toBeDefined()
  })
})
