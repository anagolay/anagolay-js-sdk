/*  eslint-disable @typescript-eslint/restrict-template-expressions */

import { hexToU8a, stringToU8a } from '@polkadot/util'
import { getApi } from '@sensio/api/connection'
import { getSensio } from '@sensio/api/utils/accounts'
import { executeOperation } from '@sensio/core/execution'
import snCid from '@sensio/op-sn-cid'
import { snEncHex } from '@sensio/op-sn-enc-hex'
import snJsonEnc from '@sensio/op-sn-json-enc'
import { SnOperation, SnSensioClaim, SnSensioSignatures } from '@sensio/types'
import config from './config'
import { InputParams, ReturnParams } from './interfaces'

/**
 * Sign the claims and return the tuple of claims and their signatures
 * @typeParam T Type `T` is generic and it is used to get the latest child operation. With default export use generic type so this operation can be executed from the leaf child
 * @return output (Return the tuple of claims and their signatures) and decoder function
 */
export default async function execute<T>(params: T): Promise<ReturnParams> {
  const c: SnOperation = config
  return executeOperation<T, ReturnParams>(c, params)
}

/**
 * Sign the claims and return the tuple of claims and their signatures
 * @param params InputParams what this method expects
 * @return output (Return the tuple of claims and their signatures) and decoder function
 */
export async function snUserSignClaims(params: InputParams): Promise<ReturnParams> {
  const connection = getApi()
  const sensioAccount = getSensio()
  const [claims, signer] = params

  if (signer.decode().type === 'sr25519') {
    throw new Error('You cannot sign with the sr25519, use ed25519')
  }

  const signatures: SnSensioSignatures[] = await Promise.all(
    claims.decode().map(async (d) => {
      const userSignature = await connection.sign(signer.decode(), {
        data: (
          await snEncHex([
            {
              data: stringToU8a(JSON.stringify(d)),
              decode: () => d,
            },
          ])
        ).decode(),
        type: 'payload',
      })

      const sensioSignature = await connection.sign(sensioAccount, {
        data: (
          await snEncHex([
            {
              data: stringToU8a(JSON.stringify(d)),
              decode: () => d,
            },
          ])
        ).decode(),
        type: 'payload',
      })
      return {
        holder: {
          cid: (
            await snCid([
              {
                data: hexToU8a(userSignature),
                decode: () => userSignature,
              },
            ])
          ).decode(),
          sig: userSignature,
          sigKey: `urn:substrate:${signer.decode().address}`,
        },
        issuer: {
          cid: (
            await snCid([
              {
                data: hexToU8a(sensioSignature),
                decode: () => sensioSignature,
              },
            ])
          ).decode(),
          sig: sensioSignature,
          sigKey: `urn:substrate:${sensioAccount.address}`,
        },
      }
    }),
  )

  const ret: [SnSensioClaim[], SnSensioSignatures[]] = [claims.decode(), signatures]

  return {
    data: (
      await snJsonEnc([
        {
          data: ret,
          decode: () => ret,
        },
      ])
    ).data,
    decode: () => ret,
  }
}
