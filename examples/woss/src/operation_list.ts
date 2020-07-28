/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { ForWhat } from '@sensio/types/sensio/interfaces'
import {
  ExpirationType,
  SensioClaimType,
  SensioStatement
} from '@sensio/types/statements/interfaces'
import { ApiPromise } from '@sensioApi'

export function buildDummyOp (api: ApiPromise): any {
  const name = 'sn_cid' + Math.random().toString()

  const data = {
    name: name,
    desc: 'generic cid',
    input: [
      {
        name: 'data',
        desc: 'Any data. The method must know what to do with it.',
        type: 'SnByteArray'
      },
      {
        name: 'statement',
        desc: 'This is the BC statement type',
        type: 'Statement'
      }
    ],
    output: {
      op_name: name,
      desc: 'generic cid',
      output: 'SnByteArray'
    },
    hashing: {
      algo: 'blake2b',
      bits: 256
    },
    encoding: {
      algo: 'hex',
      prefix: true
    },
    ops: [],
    groups: [...new Set([ForWhat.CAMERA, ForWhat.PHOTO, ForWhat.CAMERA])], // dedupe
    priority: 0
  }

  const op = {
    id: '2131232131' + Math.random().toString(),
    data
  }
  return api.createType('Operation', op)
}
export function buildDummyStatement (api: ApiPromise, copyright = true): any {
  const data: SensioStatement = {
    id: 'adsda ' + Math.random().toString(),
    data: {
      signatures: {
        holder: {
          hash: '121',
          sig: 's',
          sigKey: 'ss'
        },
        issuer: {
          hash: '121',
          sig: 's',
          sigKey: 'ss'
        }
      },
      claim: {
        prevId: '3211231232321323',
        poeId: 'bafk',
        ruleId: '23424',
        proportion: {
          name: '12312321321',
          sign: '31232131231',
          value: '132312312312312'
        },
        subjectId: 'dasdada',
        holder: '222',
        issuer: '332',
        claim_type: copyright
          ? SensioClaimType.COPYRIGHT
          : SensioClaimType.OWNERSHIP,
        valid: {
          from: '31231232131',
          until: '1231231231231'
        },
        expiration: { expirationType: ExpirationType.FOREVER, value: '' },
        on_expiration: '1231231231231232113'
      }
    }
  }

  return api.createType('SensioStatement', data)
}

export async function saveDummyOp (api: ApiPromise, signer, cb): Promise<void> {
  const op = buildDummyOp(api)
  api.tx.operations.create(op).signAndSend(signer, {}, cb)
}

export async function saveDummyCopyrightStatement (
  api: ApiPromise,
  signer,
  cb
): Promise<void> {
  const data = buildDummyStatement(api)
  api.tx.statements
    .createCopyright(data)
    .signAndSend(signer, {}, cb)
    .catch(console.error)
}

export async function saveDummyOwnershipStatement (
  api: ApiPromise,
  signer,
  cb
): Promise<void> {
  const data = buildDummyStatement(api)
  api.tx.statements.createOwnership(data).signAndSend(signer, {}, cb)
}

export async function allOperations (api: ApiPromise) {
  console.log('allOperations')

  const ops = await api.query.operations.operations.entries()
  ops.forEach(([key, [[name, data]]]) => {
    console.log('OPS', data.toJSON())
  })
}
export async function allStatements (api: ApiPromise) {
  console.log('allStatements')
  const ops = await api.query.statements.statements.entries()
  ops.forEach(([key, [[name, data]]]) => {
    console.log('statement ' + key, data.toJSON())
  })
}
export async function allUserStatements (api: ApiPromise) {
  console.log('allUserStatements')

  const ops = await api.query.statements.userStatements.entries()
  ops.forEach(([key, data]) => {
    console.log('user statements', data.toJSON())
  })
}
