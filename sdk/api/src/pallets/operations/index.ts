import { hexToString } from '@polkadot/util'
// import snCid from '@sensio/op-sn-cid'
// import snJsonEnc from '@sensio/op-sn-json-enc'
import { SnOperation, SnOperationData } from '@sensio/types'
import { OperationData as OriginalOperationData } from '@sensio/types/interfaces/operations/types'

/**
 * Decode the single operation structure from the chain,
 *
 * ATM NO OPS ARE PARSED
 *
 * @param {OperationData} op
 * @return {OperationData}
 */
export function decodeBaseOperation (
  op: OriginalOperationData
): SnOperationData {
  return {
    name: hexToString(op.name.toString()),
    desc: hexToString(op.desc.toString()),
    input: op.input.map(input => ({
      name: hexToString(input.name.toString()),
      desc: hexToString(input.desc.toString()),
      whatType: hexToString(input.whatType.toString()),
      value: hexToString(input.value.toString())
    })),
    childrenOutputs: [],
    groups: op.groups.map(m => m.toNumber()),
    ops: [],
    priority: op.priority.toNumber(),
    output: {
      opName: hexToString(op.output.opName.toString()),
      desc: hexToString(op.output.desc.toString()),
      output: hexToString(op.output.output.toString()),
      decoded: hexToString(op.output.decoded.toString())
    },
    hashing: {
      bits: op.hashing.bits.toNumber(),
      algo: hexToString(op.hashing.algo.toString())
    },
    encoding: {
      prefix: op.encoding.prefix.toHuman(),
      algo: hexToString(op.encoding.algo.toString())
    }
  }
}

/**
 * Generate Typescript friendly Operation, this is will be used to create the type
 * TODO remove the CID at some point
 * @param data
 */
export async function generateOperation (
  data: SnOperationData
): Promise<SnOperation> {
  return {
    // id: u8aToString(await snCid({ data: await snJsonEnc({ data }) })),
    id: 'TEMP',
    data
  }
}
