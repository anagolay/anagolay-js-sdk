/**
 * Sleep then continue
 * @param ms
 * @returns
 */
export default function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
