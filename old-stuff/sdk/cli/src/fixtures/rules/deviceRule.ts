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
export const cameraLensRule: SnRuleForCLI = {
  creator: defaultCreator,
  desc: 'Proof of existence for a device like camera or lens.',
  groups: [AnForWhat.CAMERA, AnForWhat.LENS],
  name: 'Anagolay Photo camera or lens PoE rule',
  parentId: '',
  version: 1,
  ops: [['cid', []]],
};
export default cameraLensRule;
