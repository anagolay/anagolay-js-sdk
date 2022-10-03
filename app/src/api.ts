/**
 * REWRITE THIS!!!!! @TODO
 */
// THIS MUST BE INCLUDED IF WE WANT AUGMENTED TYPES
//import '@anagolay/types/lib/interfaces/augment-api';
//import '@anagolay/types/lib/interfaces/augment-types';

import { AnOperation, AnOperationVersion } from '@anagolay/types';
import { ApiPromise } from '@polkadot/api';
import { Struct } from '@polkadot/types';
import { Raw } from '@polkadot/types-codec';
import { map } from 'ramda';

import { serializeThenParse } from './utils/json';

export interface OperationWithVersions {
  op: AnOperation;
  versions: AnOperationVersion[];
}

/**
 * Converts the model from polkadot to anagolay
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
export async function retrieveOperations(
  chain: ApiPromise,
  pageNum: number,
  pageSize: number
): Promise<OperationWithVersions[]> {
  // retrieve the paged operations from the chain
  const operations = await (chain.rpc as any).operations.getOperationsByIds([], pageNum * pageSize, pageSize);

  const totalVers = await chain.consts.operations.maxVersionsPerOperation.toPrimitive();
  return await Promise.all(
    operations.map(async (operation) => {
      const op: AnOperation = convertModel(operation);

      const versionIds = await chain.query.operations.versionIdsByOperationId(op.id);
      const versionsFromChain = await (chain.rpc as any).operations.getOperationVersionsByIds(
        versionIds,
        0,
        totalVers
      );
      const versions: AnOperationVersion[] = map(convertModel)(versionsFromChain);

      return {
        op,
        versions,
      };
    })
  );
}
