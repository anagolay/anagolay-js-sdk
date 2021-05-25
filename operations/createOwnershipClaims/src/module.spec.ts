import { hexToU8a } from '@anagolay/util'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { createOwnershipClaims } from './module'

/**
 * DO BETTER TESTS HERE
 */

beforeEach(() => {
  jest.useFakeTimers()
})

// this was probably not being returned
// beforeAll(async () => {
//   return await setupConnection()
// })

describe('AnOperation: createOwnershipClaims.module', (): void => {
  it.skip('should throw error when the PoE are not there', async (): Promise<void> => {
    expect.assertions(1)

    try {
      await createOwnershipClaims([
        {
          data: new Uint8Array(7),
          decode: () => ['7', '3'],
        },
      ])
    } catch (error) {
      expect(error.message).toContain("All or some PoE entries you requested don't exist")
    }
  })
  it.skip('should return correct amount of claims', async (): Promise<void> => {
    const res = await createOwnershipClaims([
      {
        data: hexToU8a(
          '0x6261667932627a616365626e646979726a626b7477686765756174616335357878636e6c7837367972786978716c646667786433723562796f34626d3667',
        ),
        decode: () => [
          '0x6261667932627a616365626e646979726a626b7477686765756174616335357878636e6c7837367972786978716c646667786433723562796f34626d3667',
        ],
      },
    ])
    const decoded = res.decode()
    // remove valid because the valid.from changes every time
    const { valid: _valid, ...claimWithoutFrom } = decoded[0]

    expect(decoded).toHaveLength(1)
    expect(claimWithoutFrom).toEqual({
      prevId: '',
      poeId: 'bafy2bzacebndiyrjbktwhgeuatac55xxcnlx76yrxixqldfgxd3r5byo4bm6g',
      ruleId: 'bafykbzacebyhpk6c7imf2a43cxo3viib74bpuc7ndc22zldlfxbthsjoze6pi',
      proportion: { name: 'percent', sign: '%', value: '100' },
      subjectId: 'bafy2bzacebndiyrjbktwhgeuatac55xxcnlx76yrxixqldfgxd3r5byo4bm6g',
      holder: 'did:substrate:5HnKtosumdYfHSifYKBHhNmoXvhDANCU8j8v7tc4p4pY7MMP/sensio-network',
      issuer: 'did:substrate:5HBr9dSKkTjWr5XL7ZHGjQLgxf1ndfin7ERnJd1hN2P7xjTx/sensio-network',
      claimType: 1,
      expiration: { expirationType: 0, value: '' },
      onExpiration: '',
    })
  })
})
