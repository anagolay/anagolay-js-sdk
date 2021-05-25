import { hexToString } from '@anagolay/util'
import { Bytes } from '@polkadot/types'

/**
 * Decode the Bytes to the string
 * @param s Any Bytes object passed from the Polkadot sdk
 */
export default function decodeHexToString(s: Bytes): string {
  return hexToString(s.toString())
}
