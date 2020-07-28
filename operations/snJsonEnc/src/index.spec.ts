import { stringToU8a } from '@polkadot/util'
import snJsonEnc from '.'

describe('SnOperation: snJsonEnc', (): void => {
  it('is defined', (): void => {
    expect(snJsonEnc).toBeDefined()
  })
  it('should pass', async (): Promise<void> => {
    const u1 = { name: 'yo' }
    const ba = stringToU8a(JSON.stringify(u1))
    const res = await snJsonEnc({ data: u1 })
    expect(res.output).toEqual(ba)
  })
})
