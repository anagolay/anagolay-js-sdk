/**
 * REWRITE THIS!!!!! @TODO
 */

// https://polkadot.js.org/docs/api/FAQ/#since-upgrading-to-the-7x-series-typescript-augmentation-is-missing
// import '@polkadot/api-augment';
// THIS MUST BE INCLUDED IF WE WANT AUGMENTED TYPES
// import '@anagolay/types/lib/interfaces/augment-api';
// import '@anagolay/types/lib/interfaces/augment-types';

import {
  AnOperation,
  AnOperationVersion,
  AnVersionId,
  OperationRecord,
  OperationVersionRecord,
  VersionId,
} from '@anagolay/types';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { Option, Struct } from '@polkadot/types';
import { Raw } from '@polkadot/types-codec';
import { isNil, map } from 'ramda';

import { serializeThenParse } from './utils/json';

export interface OperationWithVersions {
  op: AnOperation;
  versions: AnOperationVersion[];
}

/**
 * Converts the model and fixes the issue (maybe even a bug) in the polkadot/js where the Map key is hex value and RAW type.
 *
 * @remarks
 *
 * https://ipfs.anagolay.network/ipfs/QmNuZM4KGfyTMZr8DSrN5xgaMShHgCyXuDCP7AseAFHxuF?filename=BtreeMap%20hashing%20the%20key.png
 *
 * @param polkadotModel -
 * @returns
 */
function convertModel<T>(polkadotModel: Struct | Raw): T {
  return serializeThenParse<T>(polkadotModel.toHuman() as any, true);
}

/**
 * Fetch the operations from the chain then format them.
 * @param chain - Connected chain instance
 * @returns
 */
export async function retrieveOperations(chain: ApiPromise): Promise<OperationWithVersions[]> {
  // retrieve the operations from the chain
  const operations = await chain.query.operations.operationByOperationIdAndAccountId.entries<
    Option<OperationRecord>
  >();

  return await Promise.all(
    operations.map(async ([, opRecord]: [unknown, Option<OperationRecord>]) => {
      const op: AnOperation = convertModel(opRecord.unwrap().record);

      const operationFromChain = await chain.query.operations.versionIdsByOperationId<VersionId[]>(op.id);
      const versionIds: AnVersionId[] = map(convertModel)(operationFromChain);

      const versions: AnOperationVersion[] = await Promise.all(
        versionIds.map(async (versionId: AnVersionId) => {
          const opVerRecord = await chain.query.operations.versionByVersionId<Option<OperationVersionRecord>>(
            versionId
          );
          return convertModel(opVerRecord.unwrap().record);
        })
      );
      return {
        op,
        versions,
      };
    })
  );
}

/**
 * Connect to the API -- aka Anagolay Network -
 * @remarks
 * Default value for the connection is 'ws://127.0.0.1:9944', it can be overwritten by setting the `ANAGOLAY_CHAIN_WS_URL` environment variable
 * @returns
 */
export async function connectToApi(apiUrl?: string): Promise<ApiPromise> {
  const whereToConnect = !isNil(apiUrl) ? apiUrl : 'ws://127.0.0.1:9944';

  // console.log('Connecting to chain', whereToConnect);

  const wsProvider = new WsProvider(whereToConnect);

  const api = await ApiPromise.create({
    provider: wsProvider,
  });

  return api;
}
