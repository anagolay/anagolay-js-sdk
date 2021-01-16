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
export const photoRule: SnRuleForCLI = {
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
}
export default photoRule
