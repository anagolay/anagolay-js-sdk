import { Operation } from '@sensio/types/operations/interfaces'

export const op: Operation = {
  id: 'ss' + Math.random().toString(),
  data: {
    childrenOutputs: [],
    input: [
      {
        name: 'statements',
        desc:
          'File content. read file in web browser, fileReader then turn it to Uint8Array',
        whatType: 'Statement[]',
        value: ''
      }
    ],
    output: {
      op_name: 'string',
      desc: 'string',
      output: 'string'
    },
    ops: [],
    hashing: {
      bits: 256,
      algo: ''
    },
    name: 'sn_generic_cid',
    desc: 'Generic CID generation, v1 base32',
    encoding: {
      algo: '',
      prefix: true
    },
    groups: [0],
    priority: 0
  }
}

export const ops: Operation[] = [...Array(10).keys()].map(() => op)

export const stmnts = [{ name: 'statement1' }, { name: 'statement2' }]
