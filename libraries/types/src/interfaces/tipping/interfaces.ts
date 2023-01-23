import { AnBlockNumber } from '../anagolaySupport/interfaces';
import { AnVerificationContext } from '../verification/interfaces';

export interface AnTippingSettings {
  context: AnVerificationContext;
  enabled: boolean;
  account?: string;
}
export interface AnTip {
  amount: string;
  sender: string;
  receiver: string;
  createdAt: number;
  blockNumber: AnBlockNumber;
}

/**
 * NOT USED ATM
 */
export enum AnSortTips {
  'asc',
  'desc'
}
