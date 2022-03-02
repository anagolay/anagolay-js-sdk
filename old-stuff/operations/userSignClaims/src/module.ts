/*  eslint-disable @typescript-eslint/restrict-template-expressions */

import { getApi } from '@anagolay/api/connection'
import { getSensio } from '@anagolay/api/utils/accounts'
import { executeOperation } from '@anagolay/core'
import cid from '@anagolay/op-cid'
import { encHex } from '@anagolay/op-enc-hex'
import jsonEnc from '@anagolay/op-json-enc'
import { AnAnagolayClaim, AnAnagolaySignatures, AnOperation } from '@anagolay/types'
import { hexToU8a, stringToU8a } from '@anagolay/util'
import config from './config'
import { InputParams, ReturnParams } from './interfaces'

/**
 * Sign the claims and return the tuple of claims and their signatures
 * @typeParam T Type `T` is generic and it is used to get the latest child operation. With default export use generic type so this operation can be executed from the leaf child
 * @return output (Return the tuple of claims and their signatures) and decoder function
 */
export default async function execute<T>(params: T): Promise<ReturnParams> {
  const c: AnOperation = config

  return await executeOperation<T, ReturnParams>(c, params)
}

/**
 * Sign the claims and return the tuple of claims and their signatures
 * @param params InputParams what this method expects
 * @return output (Return the tuple of claims and their signatures) and decoder function
 */
export async function userSignClaims(params: InputParams): Promise<ReturnParams> {
  const connection = getApi()
  const sensioAccount = getSensio()
  const [claims, signer] = params

  if (signer.decode().type === 'sr25519') {
    throw new Error('You cannot sign with the sr25519, use ed25519')
  }

  const signatures: AnAnagolaySignatures[] = await Promise.all(
    claims.decode().map(async (d) => {
      const userSignature = await connection.sign(signer.decode(), {
        data: (
          await encHex([
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
          await encHex([
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
            await cid([
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
            await cid([
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

  const ret: [AnAnagolayClaim[], AnAnagolaySignatures[]] = [claims.decode(), signatures]

  return {
    data: (
      await jsonEnc([
        {
          data: ret,
          decode: () => ret,
        },
      ])
    ).data,
    decode: () => ret,
  }
}
