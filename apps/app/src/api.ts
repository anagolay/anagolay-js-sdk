// https://polkadot.js.org/docs/api/FAQ/#since-upgrading-to-the-7x-series-typescript-augmentation-is-missing
import '@polkadot/api-augment';
// THIS MUST BE INCLUDED IF WE WANT AUGMENTED TYPES
import '@anagolay/types/lib/interfaces/augment-api';
import '@anagolay/types/lib/interfaces/augment-types';

import {
  AnOperation,
  AnOperationVersion,
  AnVersionId,
  OperationRecord,
  OperationVersionRecord,
  VersionId,
} from '@anagolay/types';
import customTypes from '@anagolay/types/lib/customTypes.json';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { Struct } from '@polkadot/types';
import { Raw } from '@polkadot/types-codec';
import { hexToString } from '@polkadot/util';
import { isNil } from 'ramda';

export interface OperationWithVersions {
  op: AnOperation;
  versions: AnOperationVersion[];
}

function convertModel<T>(polkadotModel: Struct | Raw): T {
  return JSON.parse(JSON.stringify(polkadotModel.toHuman()), function (key, value) {
    if (key.startsWith('0x')) {
      this[hexToString(key)] = value;
      return undefined;
    }
    return value;
  });
}

export async function makeOps(chain: ApiPromise): Promise<OperationWithVersions[]> {
  return await Promise.all(
    (
      await chain.query.operations.operationsByOperationIdAndAccountId.entries<OperationRecord>()
    ).map(async ([_, opRecord]: [unknown, OperationRecord]) => {
      const op: AnOperation = convertModel(opRecord.record);

      const versionIds: AnVersionId[] = (
        await chain.query.operations.versionsByOperationId<VersionId[]>(op.id)
      ).map((versionId: VersionId) => convertModel(versionId));
      const versions: AnOperationVersion[] = await Promise.all(
        versionIds.map(async (versionId: AnVersionId) => {
          const opVerRecord: OperationVersionRecord =
            await chain.query.operations.versionsByVersionId<OperationVersionRecord>(versionId);
          return convertModel(opVerRecord.record);
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
 * @param log - Optional logging to stdout
 * @returns
 */
export async function connectToApi(apiUrl?: string): Promise<ApiPromise> {
  const whereToConnect = !isNil(apiUrl) ? apiUrl : 'ws://127.0.0.1:9944';

  console.log('Connecting to chain', whereToConnect);

  const wsProvider = new WsProvider(whereToConnect);

  const api = await ApiPromise.create({
    provider: wsProvider,
    types: customTypes,
  });

  return api;
}
