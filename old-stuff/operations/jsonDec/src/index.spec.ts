import jsonDec, { config } from '.'

describe('AnOperation: jsonDec', (): void => {
  it('is jsonDec defined', (): void => {
    expect(jsonDec).toBeDefined()
  })
  it('is config defined', (): void => {
    expect(config).toBeDefined()
  })
})
