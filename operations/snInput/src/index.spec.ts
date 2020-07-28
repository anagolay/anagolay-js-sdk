import snInput from '.'

describe('SnOperation: snInput', (): void => {
  it('is defined', (): void => {
    expect(snInput).toBeDefined()
  })
  it('should pass', async (): Promise<void> => {
    var u1 = new Uint8Array(1)

    const t = await snInput({ childrenOutputs: [{ output: u1, decode: () => u1 }] })
    expect(t.output).toEqual(u1)
  })
  it('should fail on multiple children inputs', async (): Promise<void> => {
    var u1 = new Uint8Array(1)
    var u2 = new Uint8Array(2)
    expect.assertions(1)

    try {
      await snInput({ childrenOutputs: [{ output: u1, decode: () => u1 }, { output: u2, decode: () => u2 }] })
    } catch (error) {
      expect(error.message).toEqual(
        'This operation cannot have more than one child'
      )
    }
  })
})
