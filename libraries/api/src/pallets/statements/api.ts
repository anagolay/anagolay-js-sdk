/* eslint-disable @typescript-eslint/no-explicit-any */
import '@anagolay/types/augment-api';

import { AnStatement, AnStatementData } from '@anagolay/types';
import { AddressOrPair, SignerOptions, SubmittableExtrinsic } from '@polkadot/api/types';
import { equals } from 'ramda';

import { getCachedApi } from '../../connection';
import createEventEmitter, { ICustomEventEmitter } from '../../utils/customEvents';
import networkCallback from '../../utils/networkCallback';

/**
 * Save a single poe to the chain. You need to provide the data, the ID is calculated before saving.
 *
 * __NOTE__ calculating the ID inside allows us to decouple the ID generation from the rest of the code and potentially the calculation of the ID on the chain
 * @param d - Proof data that we want to save to the chain.
 * @param signer - Account that will be owner of the transaction and ones who pays the fees
 * @param options - Signer options
 * @returns the custom event emitter
 *
 * Example:
 * ```ts
 * import { pallets } from '@anagolay/api';
 * const broadcast = await pallets.statements.saveOwnership(data, signer)
 *
 * broadcast.on(pallets.statements.config.EVENT_NAME_SINGLE, (p) => {
 *   console.log('[statements:save]', p.message)
 *   if (p.finalized) {
 *     process.exit(0)
 *   }
 * })
 * ```
 */
export async function saveOwnership(
  d: AnStatementData,
  signer: AddressOrPair,
  options: Partial<SignerOptions> = {}
): Promise<ICustomEventEmitter<AnStatement>> {
  const broadcast = createEventEmitter<AnStatement>();
  // @TODO if we need nonce in the future, this doesn't work
  // const nonce = await api.rpc.system.accountNextIndex(signer.address)
  await createSubmittableExtrinsicOfOwnership(d).signAndSend(signer, options, (params) =>
    networkCallback(params, broadcast)
  );

  // return the event emitter
  return broadcast;
}

/**
 * Helper function for creating the Submittable result. This can be easily used in the `ramda.map` function with the list of AnStatementData[]. Returns the Submittable statement object
 *
 * ```ts
 * import { map } from 'ramda'
 * const txs = map(createSubmittableExtrinsicOfCopyright, d)
 *  ```
 * @param d
 *
 */
export function createSubmittableExtrinsicOfCopyright(d: AnStatementData): SubmittableExtrinsic<'promise'> {
  const api = getCachedApi();

  return api.tx.statements.createCopyright(d);
}

/**
 * Helper function for creating the Submittable result. This can be easily used in the `ramda.map` function with the list of AnStatementData. Returns the Submittable statement object
 *
 * ```ts
 * import { map } from 'ramda'
 * const txs = map(createSubmittableExtrinsicOfOwnership, d)
 *  ```
 *
 * @param d -
 */
export function createSubmittableExtrinsicOfOwnership(d: AnStatementData): SubmittableExtrinsic<'promise'> {
  const api = getCachedApi();

  return api.tx.statements.createOwnership(d);
}

/**
 * Listen to pallets events
 * @param eventName - one of the  `'OwnershipCreated' | 'CopyrightCreated' | 'StatementRevoked'`
 * @returns EventEmitter  {@link ICustomEventEmitter} that returns {@link AnStatement}
 */
export function listenForEvent(
  eventName: 'OwnershipCreated' | 'CopyrightCreated' | 'StatementRevoked'
): ICustomEventEmitter<AnStatement> {
  const broadcast = createEventEmitter<AnStatement>();
  const api = getCachedApi();
  api.query.system.events((r: any) => {
    r.forEach(({ event }: any) => {
      const { data, method } = event;
      if (equals(method, eventName)) {
        broadcast.emit(eventName, { data: data[1].toHuman() as unknown as AnStatement });
      }
    });
  });
  return broadcast;
}
