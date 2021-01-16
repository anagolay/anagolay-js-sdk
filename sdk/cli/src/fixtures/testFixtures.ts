import { SnForWhat, SnOperationData, SnProofData, SnStatementData } from '@sensio/types'
import { SnRuleForCLI } from './rules/poclo'

// woss-test kusama account
export const defaultCreator =
  'did:substrate:5HnKtosumdYfHSifYKBHhNmoXvhDANCU8j8v7tc4p4pY7MMP/sensio-network'

// sensio network kusama account
export const defaultIssuer =
  'did:substrate:5HBr9dSKkTjWr5XL7ZHGjQLgxf1ndfin7ERnJd1hN2P7xjTx/sensio-network'

export const testOperations: SnOperationData[] = []

export const testRules: SnRuleForCLI[] = [
  {
    // this MUST be the first in order tests to succeed
    version: 1,
    name: 'Test rule',
    desc: 'test rule description',
    creator: defaultCreator,
    groups: [SnForWhat.CAMERA],
    parentId: '',
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
  },
  {
    creator: defaultCreator,
    desc: 'Incredibly simple rule. CID of any data.',
    groups: [SnForWhat.GENERIC],
    name: 'Sensio CID generation',
    parentId: '',
    version: 1,
    ops: [['sn_cid', [['sn_multihash', []]]]],
  },
  {
    creator: defaultCreator,
    desc: 'Proof of existence for a photo.',
    groups: [SnForWhat.PHOTO],
    name: 'Sensio Photo PoE rule',
    parentId: '',
    version: 1,
    ops: [
      ['sn_image_raw_pixels_hash', []],
      ['sn_image_phash', []],
      ['sn_image_metadata_hash', []],
    ],
  },
  {
    creator: defaultCreator,
    desc: 'Proof of existence for a device like camera or lens.',
    groups: [SnForWhat.CAMERA, SnForWhat.LENS],
    name: 'Sensio Photo camera or lens PoE rule',
    parentId: '',
    version: 1,
    ops: [['sn_cid', []]],
  },
]

export const testPoe: SnProofData[] = [
  {
    ruleId: 'rule:0',
    prevId: '',
    creator: defaultCreator,
    groups: [SnForWhat.CAMERA],
    params: [
      {
        k: 'bafy132131231',
        v: 'bafy31231231',
      },
      {
        k: 'bafy132131231',
        v: 'bafy31231231',
      },
    ],
  },
]

export const testStatements: SnStatementData[] = []
