/**
 * Operation specification
 */

export const config = {
  id: 'bafy2bzacedoei5dfhgu4yuyixcbjzadlsx2drpan6azwqfzowrnggru7rdynq',
  data: {
    name: 'sn_match_none',
    desc: 'This operation must have children ops. **NONE** the outputs of children ops must be the same in order to proceed.',
    input: [],
    childrenOutputs: [],
    groups: [
      6,
      7
    ],
    ops: [],
    priority: 0,
    output: {
      opName: 'sn_match_all',
      desc: 'Returns true, if none match or throws an error if some match.',
      output: 'SnBoolean',
      decoded: 'SnBoolean'
    },
    hashing: {
      bits: 256,
      algo: 'blake2b'
    },
    encoding: {
      prefix: true,
      algo: 'hex'
    }
  }
}
export default config
