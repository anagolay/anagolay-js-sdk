import execute, { snImageMetadata, config } from '.'

describe('SnOperation: snImageMetadata', (): void => {
  it('is default defined', (): void => {
    expect(execute).toBeDefined()
  })
  it('is snImageMetadata defined', (): void => {
    expect(snImageMetadata).toBeDefined()
  })
  it('is config defined', (): void => {
    expect(config).toBeDefined()
  })
})
