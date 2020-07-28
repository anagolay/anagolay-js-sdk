import { stringToU8a } from '@polkadot/util'
import snJsonDec from '.'
describe('SnOperation: snJsonDec', (): void => {
  it('is defined', (): void => {
    expect(snJsonDec).toBeDefined()
  })
  it('should pass', async (): Promise<void> => {
    const u1 = { name: 'yo' }
    const encoded = JSON.stringify(u1)

    const res = await snJsonDec({ data: stringToU8a(encoded) })

    const parsed = JSON.parse(encoded)

    expect(res.decode()).toEqual(parsed)
  })
  it('should fail when passing invalid input', async (): Promise<void> => {
    expect.assertions(1)

    const u1 = { name: 'yo' }
    const encoded = JSON.stringify(u1)

    try {
      await snJsonDec({ data: stringToU8a(encoded + '2') })
    } catch (error) {
      expect(error).toBeInstanceOf(SyntaxError)
    }
  })
})
