/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { stringCamelCase } from '@polkadot/util'
import { RuleData } from '@sensioApi/interfaces'
import { resolve } from 'path'
import { isNil } from 'ramda'
import { lensRule } from './helpers/defaultRules'
interface Operation {
  data: { ops: Operation[] }
}
async function findOperation (operationName: string): Promise<Operation> {
  const _import = await import(
    resolve(
      __dirname,
      `../../../packages/operations/src/operations/${stringCamelCase(
        operationName
      )}/config.ts`
    )
  )
  const o: Operation = _import.default
  return o
}

async function buildOperations (op: any[], level = 1): Promise<Operation> {
  const operation = await findOperation(op[0])
  const o = Object.assign({}, operation)
  console.log(`|${'_'.repeat(level)}Op is ${op[0]}`)

  // If there are children process them first
  if (!isNil(op[1])) {
    const ops = await Promise.all(
      op[1].map(async o => await buildOperations(o, level + 1))
    )
    // await Promise.all(op[1].map(async o => await buildOperations(o, level + 1)))
    //   .then(r => {
    //     console.log('inside promised', r)
    //   })
    //   .catch(console.error)
    console.log(op[0], ops)
    o.data.ops = ops
  }
  // console.log('Done with operation', operation)

  return o
}

async function enhanceRule (_rule: any): Promise<RuleData> {
  // console.log('rule', _rule)
  const rule = _rule

  const ops = [...rule.ops]
  // console.log(ops)
  rule.ops = await Promise.all(
    ops.map(async _op => {
      const operation = await buildOperations(_op)
      // console.log('Done with operation', operation)
      return operation
    })
  )
  // .then(r => {
  //   console.log('All promised', r)
  // })
  // .catch(console.error)
  // console.log('ruleops', rule.ops)

  return rule
}

async function main (): Promise<void> {
  const rule = await enhanceRule(lensRule)

  console.log(JSON.stringify(rule.ops, null, 2))
  // console.log(JSON.stringify(rule))

  // const gh = await genericHash({ data: Buffer.from("['id', 'poe-id23']") })
}

main()
  // .then(() => process.exit())
  .catch(console.error)
