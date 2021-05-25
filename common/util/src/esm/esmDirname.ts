import { dirname } from 'path'
import esmFilename from './esmFilename'

/**
 * ESM module helper for __dirname
 * @example
 * ``` typescript
 * const __dirname = esmDirname(import.meta.url)
 * ```
 */
export default function esmDirname(path: string): string {
  const __filename = esmFilename(path)

  return dirname(__filename)
}
