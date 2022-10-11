/**
 * THe augmentation does't work
 */
// import '@anagolay/types/augment-api';

import { AnOperation, AnOperationVersion, AnWorkflow } from '@anagolay/types';
import { ApiPromise } from '@anagolay/api';
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
export async function retrieveWorkflows(
  chain: ApiPromise,
  pageNum: number,
  pageSize: number
): Promise<OperationWithVersions[]> {
  // retrieve the paged operations from the chain
  const operations = await (chain.rpc as any).workflows.getWorkflowsByIds([], pageNum * pageSize, pageSize);

  const totalVers = chain.consts.workflows.maxVersionsPerWorkflow.toPrimitive();
  return await Promise.all(
    operations.map(async (workflow) => {
      const op: AnWorkflow = convertModel(workflow);

      const versionIds = await chain.query.workflows.versionIdsByWorkflowId(op.id);
      const versionsFromChain = await (chain.rpc as any).workflows.getWorkflowVersionsByIds(
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

  const totalVers = chain.consts.operations.maxVersionsPerOperation.toPrimitive();
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
