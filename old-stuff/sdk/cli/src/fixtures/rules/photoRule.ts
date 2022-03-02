/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */

import { AnForWhat, AnRuleData } from '@anagolay/types';

import { defaultCreator } from '../testFixtures';

type SnRuleWithoutOps = Omit<AnRuleData, 'ops'>;

// tuple
// type OperationDep<T> = [string, []] | [string, T[]] | [string, T[][]]

export interface SnRuleForCLI extends SnRuleWithoutOps {
  // ops: OperationDep<OperationDep<string>>[]
  ops: any[];
}
export const photoRule: SnRuleForCLI = {
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
};
export default photoRule;
