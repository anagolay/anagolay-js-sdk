/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiOptions } from '@polkadot/api/types';
import { DefinitionRpc, DefinitionRpcSub, DefinitionsCall } from '@polkadot/types/types';

import {
  anagolaySupport,
  operations,
  poe,
  statements,
  tipping,
  verification,
  workflows
} from './interfaces/definitions';

export * from './anagolay-type-mappings';
export * from './interfaces';
export * from './interfaces/anagolaySupport/interfaces';
import * as definitions from './interfaces/definitions';
export * from './interfaces/lookup';
export * from './interfaces/operations/interfaces';
export * from './interfaces/poe/interfaces';
export * from './interfaces/statements/interfaces';
export * from './interfaces/tipping/interfaces';
export * from './interfaces/types-lookup';
export * from './interfaces/verification/interfaces';
export * from './interfaces/workflows/interfaces';

/**
 * use this to add to the ApiPromise.create
 */
export const rpcDefinitions: Record<string, Record<string, DefinitionRpc | DefinitionRpcSub>> = {
  operations: operations.rpc as any,
  workflows: workflows.rpc as any,
  tipping: tipping.rpc as any,
  verification: verification.rpc as any
};
export { default as rpcDefinitionsTemp } from './tempRpcs';

/**
 * use this to add to the ApiPromise.create
 */
export const runtimeDefinitions: DefinitionsCall = {
  ...operations.runtime,
  ...workflows.runtime,
  ...tipping.runtime,
  ...verification.runtime
};

type AnagolaySchemaType = { types: any } & Pick<ApiOptions, 'rpc' | 'runtime'>;

/**
 * Anagolay schema, stitched together. Includes obsolete types too. Useful for debugging and maybe other stuff.
 */
export const anagolaySchema: AnagolaySchemaType = {
  types: {
    ...anagolaySupport.types,
    ...operations.types,
    ...statements.types,
    ...poe.types,
    ...workflows.types,
    ...verification.types,
    ...tipping.types
  },
  rpc: rpcDefinitions,
  runtime: runtimeDefinitions
};

export { definitions };
