import { SnOperation, SnOperationDataForCreating } from '@sensio/types'
import buildOperations from './buildOperations'
import { multipleOnSameLevelOps } from './fixtures/testOps'
import { resolveDependencies } from './resolveDependencies'
import { calculateOperationId } from './util/hashing'

let depsResolved: SnOperationDataForCreating[] = []
let testOps: SnOperation[] = []

beforeAll(async () => {
  depsResolved = await resolveDependencies(multipleOnSameLevelOps)
  testOps = await buildOperations(depsResolved)
})

describe('Core::Operation - operationBuilder', (): void => {
  it('is buildOperations defined', (): void => {
    expect(buildOperations).toBeDefined()
  })
  it('should build and process all the ops', async (): Promise<void> => {
    expect(depsResolved.length).toBe(testOps.length)
  })
  it('should produce correct ID', async (): Promise<void> => {
    // deep children
    const testOp1 = testOps[3].data.ops[0].data.ops[0]
    const test1 = await calculateOperationId(testOp1.data)
    expect(test1).toBe(testOp1.id)

    // one step up
    const testOp2 = testOps[3].data.ops[0]
    const test2 = await calculateOperationId(testOp2.data)
    expect(test2).toBe(testOp2.id)

    // one step up  === ROOT
    const testOp3 = testOps[3]
    const test3 = await calculateOperationId(testOp3.data)
    expect(test3).toBe(testOp3.id)
  })
})
