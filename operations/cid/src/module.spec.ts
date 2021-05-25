import multihash from '@anagolay/op-multihash'
import { stringToU8a, u8aToU8a } from '@anagolay/util'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import CID from 'cids'
import execute, { cid } from './index'

beforeEach(() => {
  jest.useFakeTimers()
})

const demo = {
  text: 'demo',
  cid: 'bafyb4iebc4lwjb2e35hrqzlml5figo33bguqxz4cawqob3x7roo3waqc7y',
}

describe('Operation: cid.module', (): void => {
  it('should be correct CID with default method', async (): Promise<void> => {
    const cid1 = await execute([
      {
        data: stringToU8a(demo.text),
        decode: () => Buffer.from(demo.text),
      },
    ])

    expect(cid1.decode()).toEqual(demo.cid)

    // lets generate the same CID based on the buffer so we can test teh correct values
    const { code, multibaseName, version } = new CID(cid1.decode())

    expect(code).toEqual(112) //'dag-pb'
    expect(version).toEqual(1)
    expect(multibaseName).toEqual('base32')
  })
  it('should be correct CID with named export method', async (): Promise<void> => {
    const hash = await multihash([
      {
        data: stringToU8a(demo.text),
        decode: () => demo.text,
      },
    ])
    const cid1 = await cid([hash])

    expect(cid1.decode()).toEqual(demo.cid)

    // lets generate the same CID based on the buffer so we can test teh correct values
    const { code, multibaseName, version } = new CID(cid1.decode())

    expect(code).toEqual(112) //'dag-pb'
    expect(version).toEqual(1)
    expect(multibaseName).toEqual('base32')
  })
  it('should fail on wrong multihash with direct passing the params', async (): Promise<void> => {
    expect.assertions(1)
    const buff = Buffer.from(demo.text)

    try {
      await cid([
        {
          data: u8aToU8a(buff),
          decode: () => buff,
        },
      ])
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(error.message).toContain('multihash unknown function code')
    }
  })
})
