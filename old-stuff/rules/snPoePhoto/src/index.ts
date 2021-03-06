/* eslint-disable no-console */
import { ImportCall } from 'typescript'

import BaseRule from '@anagolay/core/BaseRule'
import generateNpmName from '@anagolay/core/util/generateNpmName'
import { AnRule } from '@anagolay/types'

import config from './config'

/**
 * Rule class with all methods you will need
 */
class Rule extends BaseRule {
  constructor(config: AnRule) {
    super(config)
  }
  /**
   * Build the flow
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async buildFlow(): Promise<any[]> {
    const flowStatic = [
      // Segment 1 --  block  before the User Interaction op
      ['image_raw_pixels_hash'],
      ['image_phash'],
      ['image_metadata_hash'],
    ]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const imported: any[] = []
    const flow = await Promise.all(
      flowStatic.map(async (f, k1) => {
        console.log('first map', f, k1)

        imported[k1] = []
        const rows = await Promise.all(
          f.map(async (i, k2) => {
            console.log('second map', i, k2)

            // single level of the execution flow
            if (Array.isArray(i)) {
              const firstArray = await Promise.all(i.map(async (ff) => await importModule(ff)))

              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              imported[k1][k2] = firstArray
            } else {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              imported[k1][k2] = await importModule(i)
              // console.log(imported)
            }

            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return imported
          }),
        )

        return rows
      }),
    )
    // console.log('imported', imported)

    this.setFlow(flow)

    return flow
  }
}

export async function importModule(name: string): Promise<ImportCall> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return await import(generateNpmName(name))
}

/**
 * Default method that will create the class and set it up
 * @returns Instance od Rule class
 */
export default async function run(): Promise<Rule> {
  const rule = new Rule(config)

  await rule.buildFlow()

  return rule
}
