import { bufferToU8a } from '@polkadot/util'
import { SnBuffer, SnByteArray, SnReturnParams } from '@sensio/types'
import mh from 'multihashing-async'
import config from './config'
interface InputParams {
  childrenOutputs?: SnReturnParams[]
  data: SnByteArray
}

interface ReturnParams extends SnReturnParams {
  output: SnByteArray
  decode: () => SnBuffer
}

/**
* @function snMultihash
* @description Generic blake2b-256 multihash operation.
* @param {InputParams} params InputParams
* @return {Promise<ReturnParams>} output (Returns the Multihash buffer as SnByteArray.) and decoder function
*/
export default async function snMultihash (params: InputParams): Promise<ReturnParams> {
  const { data } = params
  const algo = `${config.data.hashing.algo}-${config.data.hashing.bits}`

  const hashBuf = await mh(data, algo)

  return {
    output: bufferToU8a(hashBuf),
    decode: () => hashBuf
  }
}
