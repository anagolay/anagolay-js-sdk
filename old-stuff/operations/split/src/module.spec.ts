import { AnInputParamsImplementation } from '@anagolay/types'
import { stringToU8a, u8aToString, u8aToU8a } from '@anagolay/util'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import execute from '.'

beforeEach(() => {
  jest.useFakeTimers()
})

describe('AnOperation: split.module', (): void => {
  it('should pass', async (): Promise<void> => {
    const u1 = stringToU8a('dummy statement data')
    const u2 = stringToU8a('dummy statement data #2')

    const saveStatementsOutput: AnInputParamsImplementation[] = [
      { data: u1, decode: () => u8aToString(u1) },
      { data: u2, decode: () => u8aToString(u2) },
    ]
    const res = await execute([
      {
        data: u8aToU8a(
          JSON.stringify({
            opName: 'save_statements',
            data: saveStatementsOutput,
          }),
        ),
        decode: () => ({
          opName: 'save_statements',
          data: saveStatementsOutput,
        }),
      },
    ])

    const expectedRes = [
      {
        k: 'save_statements',
        v: 'dummy statement data',
      },
      {
        k: 'save_statements',
        v: 'dummy statement data #2',
      },
    ]

    expect(res.decode().length).toEqual(2)

    expect(res.decode()).toContainEqual(expectedRes[0])
    expect(res.decode()).toContainEqual(expectedRes[1])
  })
  it('should return error on missing children', async (): Promise<void> => {
    expect.assertions(1)

    try {
      await execute([
        {
          data: u8aToU8a(
            JSON.stringify({
              opName: 'save_statements',
            }),
          ),
          decode: () => ({
            opName: 'save_statements',
            data: [],
          }),
        },
      ])
    } catch (error) {
      expect(error.message).toEqual('Missing children outputs')
    }
  })
})
