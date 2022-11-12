/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiOptions } from '@polkadot/api/types';
import { DefinitionRpc, DefinitionRpcSub, DefinitionsCall } from '@polkadot/types/types';

import {
  anagolaySupport,
  operations,
  poe,
  statements,
  verification,
  workflows
} from './interfaces/definitions';

export * from './anagolay-type-mappings';
export * from './interfaces';
export * from './interfaces/anagolaySupport/interfaces';
import * as definitions from './interfaces/definitions';
export * from './interfaces/operations/interfaces';
export * from './interfaces/poe/interfaces';
export * from './interfaces/statements/interfaces';
export * from './interfaces/verification/interfaces';
export * from './interfaces/workflows/interfaces';

/**
 * use this to add to the ApiPromise.create
 */
export const rpcDefinitions: Record<string, Record<string, DefinitionRpc | DefinitionRpcSub>> | undefined = {
  operations: operations.rpc as any,
  workflows: workflows.rpc as any
};
export { default as rpcDefinitionsTemp } from './tempRpcs';

/**
 * use this to add to the ApiPromise.create
 */
export const runtimeDefinitions: DefinitionsCall = {
  ...operations.runtime,
  ...workflows.runtime
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
    ...verification.types
  },
  rpc: rpcDefinitions,
  runtime: runtimeDefinitions
};

export { definitions };
