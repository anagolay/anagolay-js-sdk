import { hexToU8a } from '@polkadot/util'
import api from '@sensio/api'
import execute, { snCreateOwnershipClaims } from '.'

// connect to the api
beforeAll(async () => {
  await api.api.setupConnection()
}, 7000)

// disconnect the api
afterAll(async () => {
  await api.api.disconnect()
})

describe('SnOperation: snCreateOwnershipClaims', (): void => {
  it('is default defined', (): void => {
    expect(execute).toBeDefined()
  })

  it('is snCreateOwnershipClaims defined', (): void => {
    expect(snCreateOwnershipClaims).toBeDefined()
  })
  it('should throw error when the PoE are not there', async (): Promise<void> => {
    expect.assertions(1)
    try {
      await snCreateOwnershipClaims([
        {
          data: new Uint8Array(7),
          decode: () => ['7', '3'],
        },
      ])
    } catch (error) {
      expect(error.message).toContain("All or some PoE entries you requested don't exist")
    }
  })
  it('should return correct amount of claims', async (): Promise<void> => {
    const res = await snCreateOwnershipClaims([
      {
        data: hexToU8a(
          '0x6261667932627a61636563357466766978636a3667626f373272733462336c376674796961693632776f69713261626a323665636d7a6c76697537783732',
        ),
        decode: () => [
          '0x6261667932627a61636563357466766978636a3667626f373272733462336c376674796961693632776f69713261626a323665636d7a6c76697537783732',
        ],
      },
    ])
    const decoded = res.decode()
    // remove valid because the valid.from changes every time
    const { valid: _valid, ...claimWithoutFrom } = decoded[0]

    expect(decoded).toHaveLength(1)
    expect(claimWithoutFrom).toEqual({
      prevId: '',
      poeId: 'bafy2bzacec5tfvixcj6gbo72rs4b3l7ftyiai62woiq2abj26ecmzlviu7x72',
      ruleId: 'bafykbzacebyhpk6c7imf2a43cxo3viib74bpuc7ndc22zldlfxbthsjoze6pi',
      proportion: { name: 'percent', sign: '%', value: '100' },
      subjectId: 'bafy2bzacec5tfvixcj6gbo72rs4b3l7ftyiai62woiq2abj26ecmzlviu7x72',
      holder: 'did:substrate:EkVFCcdkkZjBXqfajizFEnSsgxPZVWyZ3yafUF1kusWJ2av/sensio-network',
      issuer: 'did:substrate:5HBr9dSKkTjWr5XL7ZHGjQLgxf1ndfin7ERnJd1hN2P7xjTx/sensio-network',
      claimType: 1,
      expiration: { expirationType: 0, value: '' },
      onExpiration: '',
    })
  })
})
