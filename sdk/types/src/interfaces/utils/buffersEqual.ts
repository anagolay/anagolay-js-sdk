import { SnBoolean } from '../../sensio-type-mappings'

export default function buffersEqual (
  arr1: Uint8Array,
  arr2: Uint8Array
): SnBoolean {
  return Buffer.from(arr1).equals(Buffer.from(arr2))
}
