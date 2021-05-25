import { beforeEach, describe, expect, it, jest } from '@jest/globals'

// let claims: InputParam0

beforeEach(() => {
  jest.useFakeTimers()
})
// beforeAll(async () => {
//   claims = await createOwnershipClaims([
//     {
//       data: hexToU8a(
//         '0x6261667932627a616365626e646979726a626b7477686765756174616335357878636e6c7837367972786978716c646667786433723562796f34626d3667',
//       ),
//       decode: () => [
//         '0x6261667932627a616365626e646979726a626b7477686765756174616335357878636e6c7837367972786978716c646667786433723562796f34626d3667',
//       ],
//     },
//   ])
// })

describe('AnOperation: userSignClaims.module', (): void => {
  it('should implement this', () => {
    expect(true).toBe(true)
  }) // it('should save the create correct signatures', async (): Promise<void> => {
  //   const alice = getAliceEd25519()
  //   /**
  //    * the user sign should return the sigs for all the claims, a list of them then we pack them with the save statement
  //    */
  //   const sigs = await userSignClaims([
  //     claims,
  //     {
  //       data: stringToU8a(JSON.stringify(alice)),
  //       decode: () => alice,
  //     },
  //   ])
  //   const [retClaims, retSigs] = sigs.decode()
  //   expect(retClaims).toHaveLength(1)
  //   expect(retSigs).toHaveLength(1)
  //   expect(retSigs[0]).toEqual({
  //     holder: {
  //       cid: 'bafy2bzacecgl4357a2yait2bvbkgvxfnhsogfgkb3t4cbstipn62s2zte57oe',
  //       sig:
  //         '0x35c62aabc36695a9e7638da422a3eea2bf579d2a8dbfe002dbb4eecc72c37a93245adbd3ed3113d111776f8b44ce02a1d1fa885439c64cfc621e37c97e67e903',
  //       sigKey: 'urn:substrate:5GVA2cmrXz1Shjjz79q7k82yRJFxJwZ2cESK5DbzFaaqtqyh',
  //     },
  //     issuer: {
  //       cid: 'bafy2bzacectnffzmtvnjf27lmix5isls3xpjfces7klcwyskeeu4c3p7ykvnq',
  //       sig:
  //         '0x322ae6d94f5b581ae1db4dd08e589ce56f52294d388c3a992dd03d0ccc6cc4802f9bf36b9be3404fc42ef69ee7b7b6ba10df1fe4840022857826ab467c7d5e0a',
  //       sigKey: 'urn:substrate:5Enyhqxtakxg6fPKHZvdt3FEJdbwMkKEZ1tpER7mGz75u1T6',
  //     },
  //   })
  // }, 10000)
  // it('should fail on sr25519 account for signing', async (): Promise<void> => {
  //   expect.assertions(1)
  //   const alice = getAlice()
  //   try {
  //     await userSignClaims([
  //       claims,
  //       {
  //         data: stringToU8a(JSON.stringify(alice)),
  //         decode: () => alice,
  //       },
  //     ])
  //   } catch (error) {
  //     expect(error.message).toEqual('You cannot sign with the sr25519, use ed25519')
  //   }
  // })
})
