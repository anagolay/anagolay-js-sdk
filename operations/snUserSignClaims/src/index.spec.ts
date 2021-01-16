import execute, { snUserSignClaims, config } from '.'

describe('SnOperation: snUserSignClaims', (): void => {
  it('is default defined', (): void => {
    expect(execute).toBeDefined()
  })
  it('is snUserSignClaims defined', (): void => {
    expect(snUserSignClaims).toBeDefined()
  })
  it('is config defined', (): void => {
    expect(config).toBeDefined()
  })
})
