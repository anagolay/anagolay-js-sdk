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
export const cameraLensRule: SnRuleForCLI = {
  creator: defaultCreator,
  desc: 'Proof of existence for a device like camera or lens.',
  groups: [SnForWhat.CAMERA, SnForWhat.LENS],
  name: 'Sensio Photo camera or lens PoE rule',
  parentId: '',
  version: 1,
  ops: [['sn_cid', []]],
}
export default cameraLensRule
