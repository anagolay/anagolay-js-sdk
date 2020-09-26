/**
 * MAINTAIN THIS FILE FOR THE TYPESCRIPT NATIVE TYPE CHECKING
 * THE POLKADOT API TYPES ARE IN THE definitions.ts file
 */

export type SnAccountId = string
export type SnCreatorId = string
export type SnGenericId = string
export type SnBlockNumber = number
export interface SnDefaultHashing {
  algo: string
  bits: number
}

export interface SnDefaultsEncoding {
  algo: string
  prefix: boolean
}

export interface SnDefaultsCid {
  version: number
  base: string
  codec: string
}

export interface SnDefaultValues {
  hashing: SnDefaultHashing
  encoding: SnDefaultsEncoding
  cid: SnDefaultsCid
}

export enum SnForWhat {
  'GENERIC',
  'PHOTO',
  'CAMERA',
  'LENS',
  'SMARTPHONE',
  'USER',
  'SYS',
  'FLOWCONTROL',
}
