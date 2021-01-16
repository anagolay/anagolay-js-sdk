import snJsonEnc from '.'

describe('SnOperation: snJsonEnc', (): void => {
  it('is defined', (): void => {
    expect(snJsonEnc).toBeDefined()
  })
  it('should pass', async (): Promise<void> => {
    const u1 = { name: 'yo' }
    const ba = JSON.stringify(u1)
    const res = await snJsonEnc([{ data: u1, decode: () => u1 }])
    expect(res.decode()).toEqual(ba)
  })
})
