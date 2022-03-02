import execute, { cid, config } from '.'

describe('AnOperation: cid.index', (): void => {
  it('is default defined', (): void => {
    expect(execute).toBeDefined()
  })
  it('is cid defined', (): void => {
    expect(cid).toBeDefined()
  })
  it('is config defined', (): void => {
    expect(config).toBeDefined()
  })
})
