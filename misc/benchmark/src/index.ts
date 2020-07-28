/* eslint-disable @typescript-eslint/restrict-template-expressions */
// import Benchmark from 'benchmark'
// import benchIt from 'benchmarkjs-helper'
import cbor from 'cbor'
import msgpack from 'msgpack'
import benchIt from './benchmarkjs-helper.js'
import { op, ops } from './sets'

const CHILD_OPS_AMOUNT = 10
const biggerOps = ops.map(o => {
  const p = {
    ...o,
    data: [...Array(CHILD_OPS_AMOUNT).keys()].map(() => op)
  }
  return p
})

console.group(
  `SIZES for ${biggerOps.length} operations where each child has ${CHILD_OPS_AMOUNT} operations`
)
console.log(`JSON ${JSON.stringify(biggerOps).length / 1000} kb`)
console.log(`CBOR ${cbor.encode(biggerOps).length / 1000} kb`)
console.log(`JSON ${msgpack.pack(biggerOps).length / 1000} kb`)
console.groupEnd()

// const suiteEncoding = new Benchmark.Suite('Serialization Encoding benchmark')
benchIt({
  'JSON#encode': () => {
    JSON.stringify(biggerOps)
  },
  'CBOR#encode': () => {
    cbor.encode(biggerOps).toString('ascii')
  },
  'MSGPACK#encode': () => {
    msgpack.pack(biggerOps)
  }
})

benchIt({
  'JSON#decode': {
    setupEach: () => {
      return JSON.stringify(biggerOps) // becomes x in `fn` below
    },
    fn: x => {
      JSON.parse(x)
    }
  },
  // 'CBOR#decode': {
  //   setupEach: () => {
  //     return cbor.encode(biggerOps) // becomes x in `fn` below
  //   },
  //   fn: x => {
  //     cbor.decode(x)
  //   }
  // },
  'MSGPACK#decode': {
    setupEach: () => {
      return msgpack.pack(biggerOps) // becomes x in `fn` below
    },
    fn: x => {
      msgpack.unpack(x)
    }
  }
})
