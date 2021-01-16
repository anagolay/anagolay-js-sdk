/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */

import { SnForWhat, SnRuleData } from '@sensio/types'
import { defaultCreator } from '../testFixtures'
type SnRuleWithoutOps = Omit<SnRuleData, 'ops'>

// tuple
// type OperationDep<T> = [string, []] | [string, T[]] | [string, T[][]]

export interface SnRuleForCLI extends SnRuleWithoutOps {
  // ops: OperationDep<OperationDep<string>>[]
  ops: any[]
}
export const rule: SnRuleForCLI = {
  creator: defaultCreator,
  desc:
    'Proof of Camera and Lens Ownership. Implementing this rule we can say with certainty that user owns the mentioned equipment',
  groups: [SnForWhat.CAMERA, SnForWhat.LENS],
  name: 'Sensio PoCLO rule',
  parentId: '',
  version: 1,
  ops: [
    [
      'sn_split',
      [
        [
          'sn_save_statements',
          [
            [
              'sn_identity',
              [
                [
                  'sn_user_sign_claims',
                  [
                    [
                      'sn_create_ownership_claims',
                      [
                        [
                          'sn_match_all',
                          [
                            ['sn_cid', []],
                            [
                              'sn_identity',
                              [
                                [
                                  'sn_take_photo_and_upload_qrcode',
                                  [['sn_create_qrcode', [['sn_cid', []]]]],
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
