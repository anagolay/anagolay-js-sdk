// https://raw.githubusercontent.com/treffynnon/benchmarkjs-helper/master/index.js

// a simple benchmark wrapper
const Benchmark = require('benchmark')
const beautifyBenchmark = require('beautify-benchmark')

const store = {}
global.benchmarkWrapper = store

const handleSetupEach = (k, x) => {
  if (!x.setupEach) return x
  store[k] = {
    data: [],
    setupEach: x.setupEach,
    fn: x.fn
  }
  x.setup = function () {
    const benchmarkName = this.options.name || this.name
    const store = global.benchmarkWrapper[benchmarkName]
    let counter = this.count
    while (counter--) {
      global.benchmarkWrapper[benchmarkName].data.push(store.setupEach(this))
    }
  }
  x.fn = () => {
    global.benchmarkWrapper[benchmarkName].fn.call(
      undefined,
      global.benchmarkWrapper[benchmarkName].data.pop()
    )
  }
  return x
}

module.exports = function benchIt (xs) {
  const suite = new Benchmark.Suite()
  for (k of Object.keys(xs)) {
    suite.add(k, handleSetupEach(k, xs[k]))
  }
  suite
    .on('error', e => {
      throw e.target.error
    })
    .on('cycle', e => beautifyBenchmark.add(e.target))
    .on('complete', () => beautifyBenchmark.log())
    .run({ async: false })
}
