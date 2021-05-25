import { executeOperation } from '@anagolay/core'
import { AnOperation } from '@anagolay/types'
import { bufferToU8a } from '@anagolay/util'
import { readFile } from 'fs'
import { promisify } from 'util'
import config from './config'
import { InputParam0, InputParams, ReturnParams } from './interfaces'

const readFilePromised = promisify(readFile)

/**
 * Reads the file from given path (data) and returns the buffer. RAW file buffer for other ops to use.
 * @typeParam T Type `T` is generic and it is used to get the latest child operation. With default export use generic type so this operation can be executed from the leaf child
 * @return  output (Returns the File Buffer.) and decoder function
 */
export default async function execute<T>(params: T): Promise<ReturnParams> {
  const c: AnOperation = config

  return await executeOperation<T, ReturnParams>(c, params)
}

export async function file(params: InputParams): Promise<ReturnParams> {
  const inputLength = config.data.input.length
  const data = params[inputLength - 1]

  console.log('got the request', params)
  let fileBuffer: Buffer

  // if there are no await-ing use this trick ??? maybe
  async function result(data: InputParam0) {
    const decoded = data.decode()

    if (Buffer.isBuffer(decoded)) {
      fileBuffer = decoded
    } else {
      fileBuffer = await readFilePromised(decoded)
    }

    return {
      data: bufferToU8a(fileBuffer),
      decode: () => fileBuffer,
    }
  }

  return await result(data)
}
