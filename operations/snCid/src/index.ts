import { stringToU8a } from '@polkadot/util'
import { SnByteArray, SnReturnParams, SnString } from '@sensio/types'
import CID from 'cids'
import mh from 'multihashing-async'
import config from './config'

interface InputParams {
  childrenOutputs?: SnReturnParams[]
  data: SnByteArray
}

interface ReturnParams extends SnReturnParams {
  output: SnByteArray
  decode: () => SnString
}

/**
* @function snCid
* @description Generic CID, defaults to base32 and dag-cbor for Any kind of data.
* @param {InputParams} params InputParams
* @return {Promise<ReturnParams>} output (CID string converted into SnByteArray) and decoder function
*/
export default async function snCid (params: InputParams): Promise<ReturnParams> {
  const { data } = params
  const algo = `${config.data.hashing.algo}-${config.data.hashing.bits}` // blake2b-256
  const multiHash = await mh(data, algo)
  const cid = new CID(1, 'dag-cbor', multiHash)

  return {
    output: stringToU8a(cid.toV1().toString()),
    decode: () => cid.toV1().toString()
  }
}
