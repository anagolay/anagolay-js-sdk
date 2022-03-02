/**
 * MAINTAIN THIS FILE FOR THE TYPESCRIPT NATIVE TYPE CHECKING
 * THE POLKADOT API TYPES ARE IN THE definitions.ts file
 */

import { AnInputParamsDefinition, AnString, output, outputDecoded } from '../../anagolay-type-mappings';
import { AnAccountId, AnBlockNumber, AnForWhat, AnGenericId } from '../anagolay/interfaces';

export interface AnOperationOutput {
  desc: string;
  output: output;
  decoded: outputDecoded;
}

export interface AnOperationInfo {
  operation: AnOperation;
  accountId: AnAccountId;
  blockNumber: AnBlockNumber;
}

export interface AnOperationWithStorage {
  storageKey: string;
  operationInfo: AnOperationInfo;
}

export interface AnOperation {
  id: AnGenericId;
  data: AnOperationData;
}

export interface AnOperationData {
  name: string;
  desc: string;
  input: AnInputParamsDefinition[];
  output: AnOperationOutput;
  hashingOp: AnString;
  encOp: AnString;
  groups: AnForWhat[];
  priority: number;
  ops: AnOperation[];
}

export interface AnOperationDataForCreating {
  opNames: string[];
  name: string;
  desc: string;
  input: AnInputParamsDefinition[];
  output: AnOperationOutput;
  hashingOp: AnString;
  encOp: AnString;
  groups: AnForWhat[];
  priority: number;
  ops: AnOperationDataForCreating[];
}
