import jsonEnc, { config } from '.'

describe('AnOperation: jsonEnc', (): void => {
  it('is jsonEnc defined', (): void => {
    expect(jsonEnc).toBeDefined()
  })
  it('is config defined', (): void => {
    expect(config).toBeDefined()
  })
})
