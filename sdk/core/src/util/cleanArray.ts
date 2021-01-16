import { isNil, reject } from 'ramda'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function cleanArray<T>(a: any[]): T[] {
  return reject<T>(isNil, a)
}
