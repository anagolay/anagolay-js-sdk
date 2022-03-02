import execute, { config, createOwnershipClaims } from '.'

describe('AnOperation: createOwnershipClaims.index', (): void => {
  it('is default defined', (): void => {
    expect(execute).toBeDefined()
  })
  it('is createOwnershipClaims defined', (): void => {
    expect(createOwnershipClaims).toBeDefined()
  })
  it('is config defined', (): void => {
    expect(config).toBeDefined()
  })
})
