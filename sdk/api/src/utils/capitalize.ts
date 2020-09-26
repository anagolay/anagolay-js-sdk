import { replace, toUpper } from 'ramda'

/**
 * Capitalize the string. It can be a word, sentence or full text. Uses ramda to do the transformation. It is non-destructive
 * Usage
 * ```ts
 * import capitalize from './capitalize'
 *
 * console.log(capitalize('yo')) // Yo
 * @param word
 * @returns New copy of the string
 */
export default function capitalize(word: string): string {
  return replace(/^./, toUpper)(word)
}
