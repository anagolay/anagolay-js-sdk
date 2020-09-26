import { bufferToU8a } from '@polkadot/util'
import { executeOperation } from '@sensio/core/execution'
import { SnOperation } from '@sensio/types'
import { readFile } from 'fs'
import { promisify } from 'util'
import config from './config'
import { InputParams, ReturnParams } from './interfaces'

const readFilePromised = promisify(readFile)

/**
 * Reads the file from given path (data) and returns the buffer. RAW file buffer for other ops to use.
 * @typeParam T Type `T` is generic and it is used to get the latest child operation. With default export use generic type so this operation can be executed from the leaf child
 * @return  output (Returns the File Buffer.) and decoder function
 */
export default async function execute<T>(params: T): Promise<ReturnParams> {
  const c: SnOperation = config
  return executeOperation<T, ReturnParams>(c, params)
}

export async function snFile(params: InputParams): Promise<ReturnParams> {
  const inputLength = config.data.input.length
  const data = params[inputLength - 1]
  const decoded = data.decode()

  let file: Buffer

  if (Buffer.isBuffer(decoded)) {
    file = decoded
  } else {
    file = await readFilePromised(data.decode())
  }

  return {
    data: bufferToU8a(file),
    decode: () => file,
  }
}
