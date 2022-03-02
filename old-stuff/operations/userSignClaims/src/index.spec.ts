import execute, { config, userSignClaims } from '.'

describe('AnOperation: userSignClaims.index', (): void => {
  it('is default defined', (): void => {
    expect(execute).toBeDefined()
  })
  it('is userSignClaims defined', (): void => {
    expect(userSignClaims).toBeDefined()
  })
  it('is config defined', (): void => {
    expect(config).toBeDefined()
  })
})
