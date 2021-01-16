/* eslint-disable @typescript-eslint/restrict-template-expressions */

import api from '@sensio/api'
import { createOwnershipClaimFromPoE } from '@sensio/api/pallets/statements/createClaimFromPoE'
import { executeOperation } from '@sensio/core'
import snJsonEnc from '@sensio/op-sn-json-enc'
import { SnOperation } from '@sensio/types'
import config from './config'
import { InputParams, ReturnParams } from './interfaces'
/**
 * Create the Ownership Claims from the existing PoE from the Sensio Network.
 * @typeParam T Type `T` is generic and it is used to get the latest child operation. With default export use generic type so this operation can be executed from the leaf child
 * @return output (Return the list of the Ownership Claims) and decoder function
 */
export default async function execute<T>(params: T): Promise<ReturnParams> {
  const c: SnOperation = config
  return executeOperation<T, ReturnParams>(c, params)
}

/**
 * Create the Ownership Claims from the existing PoE from the Sensio Network.
 * @param {InputParams} params InputParams
 * @return output (Return the list of the Ownership Claims) and decoder function
 */
export async function snCreateOwnershipClaims(params: InputParams): Promise<ReturnParams> {
  const inputLength = config.data.input.length
  const data = params[inputLength - 1]

  const proofs = await api.pallets.poe.getSomeDecoded(data.decode())

  // if there are no proofs or some proofs don't exist throw error. No partial returns!
  if (proofs.length === 0 || data.decode().length !== proofs.length) {
    throw new Error(
      `All or some PoE entries you requested don't exist, requested ${params.length} got ${proofs.length}`,
    )
  }

  const claims = proofs.map((p) => createOwnershipClaimFromPoE(p.proofInfo.proof))

  return {
    data: (await snJsonEnc([{ data: claims, decode: () => claims }])).data,
    decode: () => claims,
  }
}
