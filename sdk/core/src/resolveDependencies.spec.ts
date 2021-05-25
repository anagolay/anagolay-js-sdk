import { AnOperationDataForCreating } from '@anagolay/types'

import { IncompatibleInputParamChildOperationError } from './errors/IncompatibleInputParamChildOperation'
import { multipleOnSameLevelOps, ops, resolvedOpDeps } from './fixtures/testOps'
import resolveDependencies, { createInputFromOutput } from './resolveDependencies'

let depsResolved: AnOperationDataForCreating[] = []

beforeAll(async () => (depsResolved = await resolveDependencies(ops)))

describe('Core::Operation - resolveDependencies', (): void => {
  it('is defined', (): void => {
    expect(resolveDependencies).toBeDefined()
  })
  it('should generate correct number of deps', (): void => {
    expect(depsResolved.length).toBe(4)
  })
  it('should match the hard defined ops', (): void => {
    expect(depsResolved).toMatchObject(resolvedOpDeps)
  })
  it('should fail on empty string for dependency name', async (): Promise<void> => {
    expect.assertions(1)
    const op: AnOperationDataForCreating[] = [
      {
        name: 'file',
        desc: 'Reads the file from given path (data) and returns the buffer. RAW file buffer for other ops to use.',
        input: [{ data: 'AnByteArray', decoded: 'AnFileBuffer' }],
        groups: [6, 1],
        ops: [],
        priority: 0,
        output: {
          desc: 'Returns the File Buffer.',
          output: 'AnByteArray',
          decoded: 'AnFileBuffer',
        },
        hashingOp: '',
        encOp: '',
        opNames: [''],
      },
    ]

    try {
      await resolveDependencies(op)
    } catch (e) {
      expect(e.message).toEqual('Dependency must have a name, not an empty string')
    }
  })
  it('should fail on circular dependency', async (): Promise<void> => {
    expect.assertions(1)
    const op: AnOperationDataForCreating[] = [
      {
        name: 'file',
        desc: 'Reads the file from given path (data) and returns the buffer. RAW file buffer for other ops to use.',
        input: [{ data: 'AnByteArray', decoded: 'AnFileBuffer' }],
        groups: [6, 1],
        ops: [],
        priority: 0,
        output: {
          desc: 'Returns the File Buffer.',
          output: 'AnByteArray',
          decoded: 'AnFileBuffer',
        },
        hashingOp: '',
        encOp: '',
        opNames: ['file'],
      },
    ]

    try {
      await resolveDependencies(op)
    } catch (e) {
      expect(e.message).toEqual('Circular reference are not allowed for direct children.')
    }
  })
  it('should have correct priority fields', (): void => {
    expect(depsResolved[0].priority).toBe(0)
    expect(depsResolved[1].priority).toBe(1)
    expect(depsResolved[2].priority).toBe(2)
    expect(depsResolved[3].priority).toBe(1)
  })
  it('should have correct input params', (): void => {
    const op = depsResolved[2]
    const opInputFirstDirectChild = depsResolved[2].input[0]
    const opOutputFirstDirectChild = op.ops[0].output

    expect(opOutputFirstDirectChild.output).toBe(opInputFirstDirectChild.data)
    expect(opOutputFirstDirectChild.decoded).toBe(opInputFirstDirectChild.decoded)
  })
  it('should have correct amount of input params', async (): Promise<void> => {
    const op: AnOperationDataForCreating[] = [
      {
        name: 'file',
        desc: 'Reads the file from given path (data) and returns the buffer. RAW file buffer for other ops to use.',
        input: [{ data: 'AnByteArray', decoded: 'AnFileBuffer' }],
        groups: [6, 1],
        ops: [],
        priority: 0,
        output: {
          desc: 'Returns the File Buffer.',
          output: 'AnByteArray',
          decoded: 'AnFileBuffer',
        },
        hashingOp: '',
        encOp: '',
        opNames: [],
      },
      {
        name: 'file_copy',
        desc: 'Reads the file from given path (data) and returns the buffer. RAW file buffer for other ops to use.',
        input: [{ data: 'AnByteArray', decoded: 'AnFileBuffer' }],
        groups: [6, 1],
        ops: [],
        priority: 0,
        output: {
          desc: 'Returns the File Buffer.',
          output: 'AnByteArray',
          decoded: 'AnFileBuffer',
        },
        hashingOp: '',
        encOp: '',
        opNames: ['file'],
      },
    ]
    const depsResolved = await resolveDependencies(op)
    const correctOpForInput = depsResolved[0]
    const incorrectOpForInput = depsResolved[1]

    expect(correctOpForInput.input.length).toBe(1)
    expect(incorrectOpForInput.input.length).toBe(1)
  })
  it('should have correct amount of children on the same level', async (): Promise<void> => {
    const depsResolved = await resolveDependencies(multipleOnSameLevelOps)
    const correctOp = depsResolved[3].ops[0]

    expect(correctOp.ops.length).toBe(2)
  })
  it('should fail for wrong type of operation input <-> output', async (): Promise<void> => {
    expect.assertions(3)

    const op: AnOperationDataForCreating[] = [
      {
        name: 'file',
        desc: 'Reads the file from given path (data) and returns the buffer. RAW file buffer for other ops to use.',
        input: [{ data: 'AnByteArray', decoded: 'AnFileBuffer' }],
        groups: [6, 1],
        ops: [],
        priority: 0,
        output: {
          desc: 'Returns the File Buffer.',
          output: 'AnByteArray',
          decoded: 'AnFileBuffer',
        },
        hashingOp: '',
        encOp: '',
        opNames: [],
      },
      {
        name: 'file_copy',
        desc: 'Reads the file from given path (data) and returns the buffer. RAW file buffer for other ops to use.',
        input: [{ data: 'AnByteArray', decoded: 'AnString' }],
        groups: [6, 1],
        ops: [],
        priority: 0,
        output: {
          desc: 'Returns the File Buffer.',
          output: 'AnByteArray',
          decoded: 'AnFileBuffer',
        },
        hashingOp: '',
        encOp: '',
        opNames: ['file'],
      },
    ]

    try {
      await resolveDependencies(op)
    } catch (e) {
      expect(e.message).toContain('Incompatible')
      expect(e).toBeInstanceOf(IncompatibleInputParamChildOperationError)
      expect(e).toHaveProperty('extra', {
        input: op[1].input,
        output: {
          data: op[0].output.output,
          decoded: op[0].output.decoded,
        },
      })
    }
  })
  it('should succeed FlowControl operation with multiple children', async (): Promise<void> => {
    const op: AnOperationDataForCreating[] = [
      {
        name: 'match_all',
        desc: 'This operation must have children ops. **ALL** the outputs of children ops must be the same in order to proceed.',
        input: [],
        groups: [6, 7],
        ops: [],
        priority: 0,
        output: {
          desc: 'Returns true, if all match or throws an error if some match.',
          output: 'AnBoolean',
          decoded: 'AnBoolean',
        },
        hashingOp: '',
        encOp: '',
        opNames: ['file', 'file_copy'],
      },
      {
        name: 'file',
        desc: 'Reads the file from given path (data) and returns the buffer. RAW file buffer for other ops to use.',
        input: [{ data: 'AnByteArray', decoded: 'AnFileBuffer' }],
        groups: [6, 1],
        ops: [],
        priority: 0,
        output: {
          desc: 'Returns the File Buffer.',
          output: 'AnByteArray',
          decoded: 'AnFileBuffer',
        },
        hashingOp: '',
        encOp: '',
        opNames: [],
      },
      {
        name: 'file_copy',
        desc: 'Reads the file from given path (data) and returns the buffer. RAW file buffer for other ops to use.',
        input: [{ data: 'AnByteArray', decoded: 'AnFileBuffer' }],
        groups: [6, 1],
        ops: [],
        priority: 0,
        output: {
          desc: 'Returns the File Buffer.',
          output: 'AnByteArray',
          decoded: 'AnFileBuffer',
        },
        hashingOp: '',
        encOp: '',
        opNames: ['file'],
      },
    ]

    const deps = await resolveDependencies(op)
    const fcOp = deps[2]

    expect(fcOp.ops.length).toBe(2)
    expect(fcOp.input.length).toBe(2)
    expect(fcOp.input.length).toBe(2)

    const inputs = fcOp.ops.map(createInputFromOutput)

    expect(inputs).toEqual(fcOp.input)
  })
})
