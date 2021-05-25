/* eslint-disable @typescript-eslint/restrict-template-expressions */

import api from '@anagolay/api'
import { createOwnershipClaimFromPoE } from '@anagolay/api/pallets/statements/createClaimFromPoE'
import { executeOperation } from '@anagolay/core'
import jsonEnc from '@anagolay/op-json-enc'
import { AnOperation } from '@anagolay/types'
import config from './config'
import { InputParams, ReturnParams } from './interfaces'

/**
 * Create the Ownership Claims from the existing PoE from the Anagolay Network.
 * @typeParam T Type `T` is generic and it is used to get the latest child operation. With default export use generic type so this operation can be executed from the leaf child
 * @return output (Return the list of the Ownership Claims) and decoder function
 */
export default async function execute<T>(params: T): Promise<ReturnParams> {
  const c: AnOperation = config

  return await executeOperation<T, ReturnParams>(c, params)
}

/**
 * Create the Ownership Claims from the existing PoE from the Anagolay Network.
 * @param {InputParams} params InputParams
 * @return output (Return the list of the Ownership Claims) and decoder function
 */
export async function createOwnershipClaims(params: InputParams): Promise<ReturnParams> {
  const inputLength = config.data.input.length
  const data = params[inputLength - 1]

  const proofs = await api.pallets.poe.getSomeDecoded(data.decode())

  // console.log('proofs', proofs)

  // if there are no proofs or some proofs don't exist throw error. No partial returns!
  if (proofs.length === 0 || data.decode().length !== proofs.length) {
    throw new Error(
      `All or some PoE entries you requested don't exist, requested ${params.length} got ${proofs.length}`,
    )
  }

  const claims = proofs.map((p) => createOwnershipClaimFromPoE(p.proofInfo.proof))

  return {
    data: (await jsonEnc([{ data: claims, decode: () => claims }])).data,
    decode: () => claims,
  }
}
