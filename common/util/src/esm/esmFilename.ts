import { fileURLToPath } from 'url'

/**
 * ESM module helper for __filename
 * @example
 * ``` typescript
 * const __filename = esmFilename(import.meta.url)
 * ```
 */
export default function esmFilename(path: string): string {
  return fileURLToPath(path)
}
