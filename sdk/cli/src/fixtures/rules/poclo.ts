/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */

import { AnForWhat, AnRuleData } from '@anagolay/types'

import { defaultCreator } from '../testFixtures'

type SnRuleWithoutOps = Omit<AnRuleData, 'ops'>

// tuple
// type OperationDep<T> = [string, []] | [string, T[]] | [string, T[][]]

export interface SnRuleForCLI extends SnRuleWithoutOps {
  // ops: OperationDep<OperationDep<string>>[]
  ops: any[]
}
export const rule: SnRuleForCLI = {
  creator: defaultCreator,
  desc: 'Proof of Camera and Lens Ownership. Implementing this rule we can say with certainty that user owns the mentioned equipment',
  groups: [AnForWhat.CAMERA, AnForWhat.LENS],
  name: 'Anagolay PoCLO rule',
  parentId: '',
  version: 1,
  ops: [
    [
      'split',
      [
        [
          'save_statements',
          [
            [
              'identity',
              [
                [
                  'user_sign_claims',
                  [
                    [
                      'create_ownership_claims',
                      [
                        [
                          'match_all',
                          [
                            ['cid', []],
                            [
                              'identity',
                              [
                                [
                                  'take_photo_and_upload_qrcode',
                                  [['create_qrcode', [['cid', []]]]],
                                ],
                              ],
                            ],
                          ],
                        ],
                      ],
                    ],
                  ],
                ],
              ],
            ],
          ],
        ],
      ],
    ],
  ],
}
