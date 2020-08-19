import snIdentity from '.'

describe('SnOperation: snIdentity', (): void => {
  it('is defined', (): void => {
    expect(snIdentity).toBeDefined()
  })
  it('should pass', async (): Promise<void> => {
    var u1 = new Uint8Array(1)

    const t = await snIdentity([{ data: u1, decode: () => u1 }])
    expect(t.data).toEqual(u1)
  })
})
