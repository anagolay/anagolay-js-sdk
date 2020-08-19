import { bufferToU8a } from '@polkadot/util'
import { SnForWhat } from '@sensio/types'
import mh from 'multihashing-async'
import config from './config'
import { InputParams, ReturnParams } from './interfaces'

/**
 * @function snMultihash
 * @description Generic blake2b-256 multihash operation.
 * @param {InputParams} params InputParams
 * @return {Promise<ReturnParams>} output (Returns the Multihash buffer as SnByteArray.) and decoder function
 */
export default async function snMultihash (
  params: InputParams
): Promise<ReturnParams> {
  const inputLength = config.data.input.length
  const fcOpType = config.data.groups.includes(SnForWhat.FLOWCONTROL)

  if (!fcOpType && params.length !== inputLength) {
    throw new Error('Got wrong amount of inputs.')
  }
  if (inputLength === 1) {
    // start implementation here
    const data = params[inputLength - 1]
    const algo = 'blake2b-256'

    const hashBuf = await mh(data.data, algo)
    return {
      data: bufferToU8a(hashBuf),
      decode: () => hashBuf
    }
  } else {
    throw new Error(
      "This operation doesn't support more than one input param "
    )
  }
}
