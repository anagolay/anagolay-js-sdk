/* eslint-disable @typescript-eslint/no-misused-promises */
import api from '@anagolay/api'
import { getAlice } from '@anagolay/api/utils/accounts'
import { EventMessage } from '@anagolay/api/utils/networkCallback'
import { executeOperation } from '@anagolay/core'
import { cid } from '@anagolay/op-cid'
import { multihash } from '@anagolay/op-multihash'
import { AnAnagolayStatement, AnOperation, AnStatementData } from '@anagolay/types'
import { stringToU8a } from '@anagolay/util'
import config from './config'
import { InputParams, ReturnParams } from './interfaces'

/**
 * Save the given statements to the Sensio Network. This operation waits until the records are in finalized state. Accepts the list of claims with the list of signatures for each claim. Mapping is done with the index of the list so `param1[0]` and `param2[0]`. If there are mismatches in the either of the params this operation will fail. Meaning that `param1.length === param2.length`
 * @typeParam T Type `T` is generic and it is used to get the latest child operation. With default export use generic type so this operation can be executed from the leaf child
 * @return output (Return the List of signed statement IDs) and decoder function
 */
export default async function execute<T>(params: T): Promise<ReturnParams> {
  const c: AnOperation = config

  return await executeOperation<T, ReturnParams>(c, params)
}

/**
 * Save the given statements to the Sensio Network. This operation waits until the records are in finalized state. Accepts the list of claims with the list of signatures for each claim. Mapping is done with the index of the list so `param1[0]` and `param2[0]`. If there are mismatches in the either of the params this operation will fail. Meaning that `param1.length === param2.length`
 * @param params InputParams what this method expects
 * @return output (Return the List of signed statement IDs) and decoder function
 */
export async function saveStatements(
  params: InputParams,
  cb?: (p: EventMessage<ReturnParams>) => void,
): Promise<ReturnParams> {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    // eslint-disable-next-line no-async-promise-executor
    // return new Promise(async (resolve, reject) => {
    // return await new Promise(async (resolve, reject) => {
    const [claims, signatures] = params

    const claimsDecoded = claims.decode()
    const signaturesDecoded = signatures.decode()

    if (claimsDecoded.length !== signaturesDecoded.length) {
      throw new Error(
        `Params are not matching, got ${claimsDecoded.length} claims and ${signaturesDecoded.length} signatures`,
      )
    }

    /**
     * Build the statements from the input params, claims and signatures
     */
    const statements = await Promise.all(
      claimsDecoded.map(async (claim, k): Promise<AnAnagolayStatement> => {
        const data: AnStatementData = {
          claim,
          signatures: signaturesDecoded[k],
        }

        return {
          id: (
            await cid([
              await multihash([
                {
                  data: stringToU8a(JSON.stringify(data)),
                  decode: () => data,
                },
              ]),
            ])
          ).decode(),
          data,
        }
      }),
    )

    // await api.pallets.statements.saveBulk(statements, getAlice())
    const s = await api.pallets.statements.saveBulk(statements, getAlice())

    if (cb) {
      s.on<ReturnParams>(api.pallets.statements.config.EVENT_NAME_BATCH, (p) => {
        if (p.error) {
          reject(p.error)
        } else if (p.finalized) {
          const payload = makeReturn(statements)

          if (cb) {
            cb({ ...p, response: payload })
          }

          resolve(payload)
        } else {
          if (cb) {
            cb(p)
          }
        }
      })
    } else {
      const payload = makeReturn(statements)

      resolve(payload)
    }
  })
}

/**
 * Make the return payload
 * @param statements
 */
function makeReturn(statements: AnAnagolayStatement[]): ReturnParams {
  const statementPoeIds = statements.map((s) => ({
    statement_id: s.id,
    poe_id: s.data.claim.poeId,
  }))

  const payload = {
    data: stringToU8a(JSON.stringify(statementPoeIds)),
    decode: () => statementPoeIds,
  }

  return payload
}
