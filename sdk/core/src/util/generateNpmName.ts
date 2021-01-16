/**
 * Generate @sensio/op-snake-name-operation
 * @param {string} opName
 * @return {string}
 */
export default function generateNpmName(opName: string): string {
  return `@sensio/op-${opName.replace(/_/g, '-')}`
}
