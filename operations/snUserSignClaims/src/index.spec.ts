import { hexToU8a, stringToU8a } from '@polkadot/util'
import api from '@sensio/api'
import { getAlice, getAliceEd25519 } from '@sensio/api/utils/accounts'
import { snCreateOwnershipClaims } from '@sensio/op-sn-create-ownership-claims'
import execute, { snUserSignClaims } from '.'
import { InputParam0 } from './interfaces'

let claims: InputParam0

beforeAll(async () => {
  await api.api.setupConnection()
  claims = await snCreateOwnershipClaims([
    {
      data: hexToU8a(
        '0x6261667932627a61636563357466766978636a3667626f373272733462336c376674796961693632776f69713261626a323665636d7a6c76697537783732',
      ),
      decode: () => [
        '0x6261667932627a61636563357466766978636a3667626f373272733462336c376674796961693632776f69713261626a323665636d7a6c76697537783732',
      ],
    },
  ])
}, 7000)

// disconnect the api
afterAll(async () => {
  await api.api.disconnect()
})

describe('SnOperation: snUserSignClaims', (): void => {
  it('is default defined', (): void => {
    expect(execute).toBeDefined()
  })

  it('is snUserSignClaims defined', (): void => {
    expect(snUserSignClaims).toBeDefined()
  })
  it('should save the create correct signatures', async (): Promise<void> => {
    const alice = getAliceEd25519()

    /**
     * the user sign should return the sigs for all the claims, a list of them then we pack them with the save statement
     */

    const sigs = await snUserSignClaims([
      claims,
      {
        data: stringToU8a(JSON.stringify(alice)),
        decode: () => alice,
      },
    ])
    const [retClaims, retSigs] = sigs.decode()

    expect(retClaims).toHaveLength(1)
    expect(retSigs).toHaveLength(1)
    expect(retSigs[0]).toEqual({
      holder: {
        cid: 'bafy2bzacecgl4357a2yait2bvbkgvxfnhsogfgkb3t4cbstipn62s2zte57oe',
        sig:
          '0x35c62aabc36695a9e7638da422a3eea2bf579d2a8dbfe002dbb4eecc72c37a93245adbd3ed3113d111776f8b44ce02a1d1fa885439c64cfc621e37c97e67e903',
        sigKey: 'urn:substrate:5GVA2cmrXz1Shjjz79q7k82yRJFxJwZ2cESK5DbzFaaqtqyh',
      },
      issuer: {
        cid: 'bafy2bzacectnffzmtvnjf27lmix5isls3xpjfces7klcwyskeeu4c3p7ykvnq',
        sig:
          '0x322ae6d94f5b581ae1db4dd08e589ce56f52294d388c3a992dd03d0ccc6cc4802f9bf36b9be3404fc42ef69ee7b7b6ba10df1fe4840022857826ab467c7d5e0a',
        sigKey: 'urn:substrate:5Enyhqxtakxg6fPKHZvdt3FEJdbwMkKEZ1tpER7mGz75u1T6',
      },
    })
  }, 10000)
  it('should fail on sr25519 account for signing', async (): Promise<void> => {
    expect.assertions(1)
    const alice = getAlice()

    try {
      await snUserSignClaims([
        claims,
        {
          data: stringToU8a(JSON.stringify(alice)),
          decode: () => alice,
        },
      ])
    } catch (error) {
      expect(error.message).toEqual('You cannot sign with the sr25519, use ed25519')
    }
  })
})
