/* eslint-disable no-console */
import runRule from './index'

export async function main(): Promise<void> {
  await runRule()

  //   console.log('dass', JSON.stringify(rule.getFlow()))
}

main().then().catch(console.error)
