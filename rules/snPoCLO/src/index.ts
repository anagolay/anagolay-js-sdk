/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async buildFlow(): Promise<any[]> {
    const flowStatic = [
      // Segment 1 --  block  before the User Interaction op
      ['cid', 'create_qrcode'],
      // Segment 2 --  user interaction block
      ['take_photo_and_upload_qrcode'], // take_photo_and_upload_qrcode(generateQrCodeOutput)
      // Segment 3 --  block  after the User Interaction op
      [['identity', 'cid'], 'match_all', 'create_ownership_claims'],
      // Segment 4 -- user interaction block
      ['user_sign_claims'],
      // Segment 5 -- non user interaction block
      ['identity', 'save_statements', 'split'],
    ]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const imported: any[] = []
    const flow = await Promise.all(
      flowStatic.map(async (f, k1) => {
        imported[k1] = []
        const rows = await Promise.all(
          f.map(async (i, k2) => {
            // single level of the execution flow
            if (Array.isArray(i)) {
              const firstArray = await Promise.all(i.map(async (ff) => await importModule(ff)))

              imported[k1][k2] = firstArray
            } else {
              imported[k1][k2] = await importModule(i)
            }

            return imported
          }),
        )

        return rows
      }),
    )

    console.log('imported', imported)

    this.setFlow(flow)

    return flow
  }
}

export async function importModule(name: string): Promise<ImportCall> {
  return await import(generateNpmName(name))
}

/**
 * Default method that will create the class and set it up
 * @returns Instance od Rule class
 */
export default async function run(): Promise<Rule> {
  const rule = new Rule(config)

  return rule
}
