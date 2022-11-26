import '@anagolay/types/augment-api';

import { Operation, OperationData, OperationVersionData } from '@anagolay/types';
import { AddressOrPair, SignerOptions, SubmittableExtrinsic } from '@polkadot/api/types';
import { map } from 'ramda';

import { getCachedApi } from '../../connection';
import { convertModel } from '../../utils/convert';
import createEventEmitter, { ICustomEventEmitter } from '../../utils/customEvents';
import networkCallback from '../../utils/networkCallback';
import { IOperationWithVersions } from './interfaces';

/**
 * Save a single operation to the chain.
 * @param operationData - Operation Data to save
 * @param versionData - Operation Version Data to save
 * @param signer - Account that will be owner of the transaction and ones who pays the fees
 * @param options - Signer options
 * @returns the custom event emitter
 *
 * Example:
 * ```ts
 * import { pallets } from '@anagolay/api';
 * const broadcast = await pallets.operations.save(operationData, versionData, signer)
 *
 * broadcast.on(pallets.operations.config.EVENT_NAME_SINGLE, (p) => {
 *   console.log('[operations:save]', p.message)
 *   if (p.finalized) {
 *     process.exit(0)
 *   }
 * })
 * ```
 */
export async function save(
  operationData: OperationData,
  versionData: OperationVersionData,
  signer: AddressOrPair,
  options: Partial<SignerOptions> = {}
): Promise<ICustomEventEmitter<unknown>> {
  const broadcast = createEventEmitter<unknown>();

  // @TODO if we need nonce in the future, this doesn't work
  // const nonce = await api.rpc.system.accountNextIndex(signer.address)
  await createSubmittableExtrinsic(operationData, versionData).signAndSend(signer, options, (params) =>
    networkCallback(params, broadcast)
  );

  // return the event emitter
  return broadcast;
}

/**
 * Helper function for creating the Submittable result. This can be easily used in the `ramda.map`.
 *
 * ```ts
 * import { map } from 'ramda'
 * const txs = map(createSubmittableExtrinsic, d)
 *  ```
 *
 * @param operationData -
 * @param versionData -
 *
 */
export function createSubmittableExtrinsic(
  operationData: OperationData,
  versionData: OperationVersionData
): SubmittableExtrinsic<'promise'> {
  const api = getCachedApi();

  return api.tx.operations.create(operationData, versionData);
}

/**
 * Fetch the operations and their versions.
 * @param pageNum - default is `0`
 * @param pageSize - default is `100`
 * @returns Decoded structure {@link IOperationWithVersions}
 */
export async function retrieveOperationsPaged(
  pageNum: number = 0,
  pageSize: number = 100
): Promise<IOperationWithVersions[]> {
  const api = getCachedApi();

  const totalVers = api.consts.operations.maxVersionsPerOperation.toPrimitive();
  const operationsRaw = await api.rpc.operations.getOperationsByIds([], pageNum * pageSize, pageSize);

  const t = map(async (op: Operation) => {
    const versionIds = convertModel<string[]>(await api.query.operations.versionIdsByOperationId(op.id));
    const versionsFromChain = await api.rpc.operations.getOperationVersionsByIds(versionIds, 0, totalVers);
    return {
      operation: convertModel(op),
      versions: map(convertModel)(versionsFromChain)
    } as IOperationWithVersions;
  })(operationsRaw);
  return await Promise.all(t);
}
