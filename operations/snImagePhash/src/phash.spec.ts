import { readFileSync } from 'fs'
import { resolve } from 'path'
import createPhash, { binaryToHex, createRawHash, hexToBinary } from './phash'

const defaultBinaryPhash =
  '1111111000010000111111110000000001000000110111111100000011101110'

const defaultHexPhash = 'fe10ff0040dfc0ee'

describe('SnOperation:snImagePhash:phash', () => {
  it('is defined, createPhash', (): void => {
    expect(createPhash).toBeDefined()
  })
  it('is defined, binaryToHex', (): void => {
    expect(binaryToHex).toBeDefined()
  })
  it('is defined, createRawHash', (): void => {
    expect(createRawHash).toBeDefined()
  })
  it('is defined, createRawHash', (): void => {
    expect(hexToBinary).toBeDefined()
  })
  it('should accept proper params', async (): Promise<void> => {
    const path = resolve(__dirname, '../../../assets/test-images/01.jpg')
    const res = await createPhash(path)
    expect(res).toBeDefined()
    expect(res).toEqual(defaultBinaryPhash)

    const res1 = await createPhash(readFileSync(path))
    expect(res1).toBeDefined()
    expect(res1).toEqual(defaultBinaryPhash)
  })
  it('should convert to hex', (): void => {
    expect(binaryToHex(defaultBinaryPhash)).toEqual(defaultHexPhash)
  })
  it('should convert to bin', (): void => {
    expect(hexToBinary(defaultHexPhash)).toEqual(defaultBinaryPhash)
  })
  it('should fail properly on convert to bin', (): void => {
    expect.assertions(1)
    try {
      hexToBinary(defaultHexPhash + 'z')
    } catch (error) {
      expect(error.message).toContain('doesn\'t exist in the hex lookup table')
    }
  })
  it('should fail properly on convert to hex', (): void => {
    expect.assertions(1)
    try {
      binaryToHex(defaultBinaryPhash + 'z')
    } catch (error) {
      expect(error.message).toContain('doesn\'t exist in the bin lookup table')
    }
  })
})
