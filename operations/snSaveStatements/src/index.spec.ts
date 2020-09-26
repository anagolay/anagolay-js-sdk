/*  eslint-disable @typescript-eslint/restrict-template-expressions */

import { hexToU8a, stringToU8a } from '@polkadot/util'
import api from '@sensio/api'
import { getApi } from '@sensio/api/connection'
import { getAliceEd25519, getBob } from '@sensio/api/utils/accounts'
import snCid from '@sensio/op-sn-cid'
import { snCreateOwnershipClaims } from '@sensio/op-sn-create-ownership-claims'
import { snEncHex } from '@sensio/op-sn-enc-hex'
import { SnSensioSignatures } from '@sensio/types'
import execute, { snSaveStatements } from '.'
import { InputParam1 } from './interfaces'
// connect to the api
beforeAll(async () => {
  await api.api.setupConnection()
}, 7000)

// disconnect the api
afterAll(async () => {
  await api.api.disconnect()
})

async function simulateUserSigningOperation(
  payload: Uint8Array,
  signer: any,
  connection: any,
): Promise<SnSensioSignatures> {
  if (signer.type === 'sr25519') {
    throw new Error('You cannot sign with the sr25519, use ed25519')
  }
  const bob = getBob()

  const sig = await connection.sign(signer, {
    data: snEncHex([
      {
        data: payload,
        decode: () => payload,
      },
    ]),
    type: 'payload',
  })

  const issuerSig = await connection.sign(bob, {
    data: snEncHex([
      {
        data: payload,
        decode: () => payload,
      },
    ]),
    type: 'payload',
  })

  return {
    holder: {
      cid: (
        await snCid([
          {
            data: hexToU8a(sig),
            decode: () => sig,
          },
        ])
      ).decode(),
      sig,
      sigKey: `urn:substrate:${signer.address}`,
    },
    issuer: {
      cid: (
        await snCid([
          {
            data: hexToU8a(issuerSig),
            decode: () => sig,
          },
        ])
      ).decode(),
      sig: issuerSig,
      sigKey: `urn:substrate:${bob.address}`,
    },
  }
}

describe('SnOperation: snSaveStatements', (): void => {
  it('is default defined', (): void => {
    expect(execute).toBeDefined()
  })

  it('is snSaveStatements defined', (): void => {
    expect(snSaveStatements).toBeDefined()
  })
  it('should save the ownership statements', async (): Promise<void> => {
    const connection = getApi()
    const alice = getAliceEd25519()
    const claims = await snCreateOwnershipClaims([
      {
        data: hexToU8a(
          '0x6261667932627a61636563357466766978636a3667626f373272733462336c376674796961693632776f69713261626a323665636d7a6c76697537783732',
        ),
        decode: () => [
          '0x6261667932627a61636563357466766978636a3667626f373272733462336c376674796961693632776f69713261626a323665636d7a6c76697537783732',
        ],
      },
    ])

    /**
     * the user sign should return the sigs for all the claims, a list of them then we pack them with the save statement
     */

    const sigsList = await Promise.all(
      claims.decode().map(async (d) => {
        // we need to cheat here to get the same claim all the time

        return await simulateUserSigningOperation(stringToU8a(JSON.stringify(d)), alice, connection)
      }),
    )

    const sigs: InputParam1 = {
      data: stringToU8a(JSON.stringify(sigsList)),
      decode: () => sigsList,
    }

    // console.log(JSON.stringify([claims.decode(), sigsList], null, 2))
    const statementsIds = await snSaveStatements([claims, sigs])

    expect(statementsIds.decode()).toHaveLength(1)
  }, 10000)
})
