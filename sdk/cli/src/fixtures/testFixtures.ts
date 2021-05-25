import { AnForWhat, AnOperationData, AnProofData, AnStatementData } from '@anagolay/types'

import { SnRuleForCLI as AnRuleForCLI } from './rules/poclo'

// woss-test kusama account
export const defaultCreator =
  'did:substrate:5HnKtosumdYfHSifYKBHhNmoXvhDANCU8j8v7tc4p4pY7MMP/sensio-network'

// anagolay network kusama account
export const defaultIssuer =
  'did:substrate:5HBr9dSKkTjWr5XL7ZHGjQLgxf1ndfin7ERnJd1hN2P7xjTx/sensio-network'

export const testOperations: AnOperationData[] = []

export const testRules: AnRuleForCLI[] = [
  {
    // this MUST be the first in order tests to succeed
    version: 1,
    name: 'Test rule',
    desc: 'test rule description',
    creator: defaultCreator,
    groups: [AnForWhat.CAMERA],
    parentId: '',
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
  },
  {
    creator: defaultCreator,
    desc: 'Incredibly simple rule. CID of any data.',
    groups: [AnForWhat.GENERIC],
    name: 'Anagolay CID generation',
    parentId: '',
    version: 1,
    ops: [['cid', [['multihash', []]]]],
  },
  {
    creator: defaultCreator,
    desc: 'Proof of existence for a photo.',
    groups: [AnForWhat.PHOTO],
    name: 'Anagolay Photo PoE rule',
    parentId: '',
    version: 1,
    ops: [
      ['image_raw_pixels_hash', []],
      ['image_phash', []],
      ['image_metadata_hash', []],
    ],
  },
  {
    creator: defaultCreator,
    desc: 'Proof of existence for a device like camera or lens.',
    groups: [AnForWhat.CAMERA, AnForWhat.LENS],
    name: 'Anagolay Photo camera or lens PoE rule',
    parentId: '',
    version: 1,
    ops: [['cid', []]],
  },
]

export const testPoe: AnProofData[] = [
  {
    ruleId: 'rule:0',
    prevId: '',
    creator: defaultCreator,
    groups: [AnForWhat.CAMERA],
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

export const testStatements: AnStatementData[] = []
