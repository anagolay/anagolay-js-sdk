/**
 * Generate nonce
 */
export default function generateNonce (): string {
  return (Math.random() * 10000000).toFixed(0)
}
