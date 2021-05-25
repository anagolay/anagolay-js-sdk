import execute, { config, imagePhash } from '.'

describe('AnOperation: snImagePhash', (): void => {
  it('is default defined', (): void => {
    expect(execute).toBeDefined()
  })
  it('is snImagePhash defined', (): void => {
    expect(imagePhash).toBeDefined()
  })
  it('is config defined', (): void => {
    expect(config).toBeDefined()
  })
})
