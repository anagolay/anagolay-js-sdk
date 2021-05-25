/**
 * Generate @anagolay/op-snake-name-operation
 * @param {string} opName
 * @return {string}
 */
export default function generateNpmName(opName: string): string {
  return `@anagolay/op-${opName.replace(/_/g, '-')}`
}
