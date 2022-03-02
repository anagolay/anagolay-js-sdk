/**
 * MAINTAIN THIS FILE FOR THE TYPESCRIPT NATIVE TYPE CHECKING
 * THE POLKADOT API TYPES ARE IN THE definitions.ts file
 */

export type AnAccountId = string;
export type AnCreatorId = string;
export type AnGenericId = string;
export type AnBlockNumber = number;
export interface AnDefaultHashing {
  algo: string;
  bits: number;
}

export interface AnDefaultsEncoding {
  algo: string;
  prefix: boolean;
}

export interface AnDefaultsCid {
  version: number;
  base: string;
  codec: string;
}

export interface AnDefaultValues {
  hashing: AnDefaultHashing;
  encoding: AnDefaultsEncoding;
  cid: AnDefaultsCid;
}

export enum AnForWhat {
  'GENERIC',
  'PHOTO',
  'CAMERA',
  'LENS',
  'SMARTPHONE',
  'USER',
  'SYS',
  'FLOWCONTROL',
}
