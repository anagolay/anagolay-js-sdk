/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { api as SensioApi } from '@sensioApi'
import { getAlice } from '@sensioApi/api'
import { decodeOperation } from '@sensioCli'

async function main (): Promise<void> {
  await cryptoWaitReady()

  const api = await SensioApi()
  // TODO: default ops
  // const {defaultOperations} = api.consts.operation
  const opsCount = await api.query.operations.operationCount()
  console.log('Ops count', opsCount.toNumber())

  const statementCount = await api.query.statements.statementsCount()
  console.log('Statement count', statementCount.toNumber())

  // await allOperations(api)
  // await allStatements(api)
  // await allUserStatements(api)

  console.log('='.repeat(100))
  const alice = getAlice()

  console.time('TX creation start')
  const ops = api.consts.operations.defaultOperations
  const decodedOps = ops.map(op => decodeOperation(op))
  // writeFileSync('./defaultOps.json', JSON.stringify(decodedOps, null, 2))
  // await regenerateOperations(ops)

  // const txs = [...Array(20).keys()].map(() =>
  //   // api.tx.statements.createOwnership(buildDummyStatement(api, false))
  // api.tx.statements.createCopyright(buildDummyStatement(api))
  // )
  // console.timeEnd('TX creation start')
  // console.log(`Amount of transactions ${txs.length}`)
  // console.time('TX saving start')
  // await api.tx.utility
  //   .batch(txs)
  //   .signAndSend(alice, {}, ({ status, isError }) => {
  //     console.log(`\tTransaction status: ${status.type}`)
  //     // console.log(`\tEvents: ${events}`)

  //     if (status.isFinalized) {
  //       // console.log('\tFinalized block hash', status.asFinalized.toHex())
  //     } else if (isError) {
  //       console.error(status)
  //     } else if (status.isInBlock) {
  //       console.timeEnd('TX saving start')
  //     }
  //   })
  //   .catch(console.error)

  // await saveDummyCopyrightStatement(
  //   api,
  //   alice,
  //   async ({ events = [], status, isError }) => {
  //     console.log(`\tTransaction sync status:${status.type}`)

  //     if (status.isInBlock) {
  //       console.log('\tIncluded at block hash', status.asInBlock.toHex())

  //       console.log('\tEvents:', events.length)

  //       events.forEach(({ event, phase }) => {
  //         const { data, method, section } = event
  //         const [error] = data

  //         // console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
  //         // console.log('\t', phase.toString(), `: ${section}.${method}`);

  //         if (error.isModule) {
  //           const { documentation, name, section } = api.registry.findMetaError(
  //             error.asModule
  //           )
  //           console.error('\t', documentation.toString(), name, section)
  //           console.error('\tRejecting ...')

  //           // reject here would make all the other promises to fail
  //           // reject('ExtrinsicFailed');
  //         } else {
  //           console.log(
  //             '\t',
  //             phase.toString(),
  //             `: ${section}.${method}`,
  //             data.toString()
  //           )
  //         }
  //       })
  //     } else if (status.isFinalized) {
  //       console.log('\tFinalized block hash', status.asFinalized.toHex())
  //       await allOperations(api)
  //     } else if (isError) {
  //       console.error(status)
  //     }

  //     // console.log(
  //     //   `Rule created for ${ForWhat[r.forWhat]}\n hash: ${createdRuleSimple.toHex()}\n cid: ${hexToString(ruleId)}`,
  //     // );
  //   }
  // )
}

main()
  .then(() => process.exit(0))
  .catch(console.error)
