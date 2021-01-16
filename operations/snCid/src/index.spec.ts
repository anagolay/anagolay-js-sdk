import execute, { snCid, config } from '.'

describe('SnOperation: snCid', (): void => {
  it('is default defined', (): void => {
    expect(execute).toBeDefined()
  })
  it('is snCid defined', (): void => {
    expect(snCid).toBeDefined()
  })
  it('is config defined', (): void => {
    expect(config).toBeDefined()
  })
})
