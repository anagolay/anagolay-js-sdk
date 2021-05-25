/* eslint-disable @typescript-eslint/no-explicit-any */
/*  eslint-disable @typescript-eslint/restrict-template-expressions */

// import { AnAnagolaySignatures } from '@anagolay/types'
// import { hexToU8a, stringToU8a } from '@anagolay/util'
// import { getApi } from '@anagolay/api/connection'
// import { getAliceEd25519, getBob } from '@anagolay/api/utils/accounts'
// import cid from '@anagolay/op-cid'
// import { createOwnershipClaims } from '@anagolay/op-create-ownership-claims'
// import { encHex } from '@anagolay/op-enc-hex'
// import { InputParam1 } from './interfaces'
import { beforeEach, describe, it, jest } from '@jest/globals'

beforeEach(() => {
  jest.useFakeTimers()
})

// async function simulateUserSigningOperation(
//   payload: Uint8Array,
//   signer: any,
//   connection: any,
// ): Promise<AnAnagolaySignatures> {
//   if (signer.type === 'sr25519') {
//     throw new Error('You cannot sign with the sr25519, use ed25519')
//   }
//   const bob = getBob()

//   const sig = await connection.sign(signer, {
//     data: encHex([
//       {
//         data: payload,
//         decode: () => payload,
//       },
//     ]),
//     type: 'payload',
//   })

//   const issuerSig = await connection.sign(bob, {
//     data: encHex([
//       {
//         data: payload,
//         decode: () => payload,
//       },
//     ]),
//     type: 'payload',
//   })

//   return {
//     holder: {
//       cid: (
//         await cid([
//           {
//             data: hexToU8a(sig),
//             decode: () => sig,
//           },
//         ])
//       ).decode(),
//       sig,
//       sigKey: `urn:substrate:${signer.address}`,
//     },
//     issuer: {
//       cid: (
//         await cid([
//           {
//             data: hexToU8a(issuerSig),
//             decode: () => issuerSig,
//           },
//         ])
//       ).decode(),
//       sig: issuerSig,
//       sigKey: `urn:substrate:${bob.address}`,
//     },
//   }
// }

describe('AnOperation: saveStatements.module', (): void => {
  it('should implement this', () => {
    expect(true).toBe(true)
  })
  // it('should save the ownership statements', async (): Promise<void> => {
  //   const connection = getApi()
  //   const alice = getAliceEd25519()
  //   const claims = await createOwnershipClaims([
  //     {
  //       data: hexToU8a(
  //         '0x6261667932627a616365626e646979726a626b7477686765756174616335357878636e6c7837367972786978716c646667786433723562796f34626d3667',
  //       ),
  //       decode: () => [
  //         '0x6261667932627a616365626e646979726a626b7477686765756174616335357878636e6c7837367972786978716c646667786433723562796f34626d3667',
  //       ],
  //     },
  //   ])
  //   /**
  //    * the user sign should return the sigs for all the claims, a list of them then we pack them with the save statement
  //    */
  //   const sigsList = await Promise.all(
  //     claims.decode().map(async (d) => {
  //       // we need to cheat here to get the same claim all the time
  //       return await simulateUserSigningOperation(stringToU8a(JSON.stringify(d)), alice, connection)
  //     }),
  //   )
  //   const sigs: InputParam1 = {
  //     data: stringToU8a(JSON.stringify(sigsList)),
  //     decode: () => sigsList,
  //   }
  //   // console.log(JSON.stringify([claims.decode(), sigsList], null, 2))
  //   const statementsIds = await saveStatements([claims, sigs])
  //   expect(statementsIds.decode()).toHaveLength(1)
  // }, 10000)
})
