import '@anagolay/types/augment-api';

import { AnProofData } from '@anagolay/types';
import { AddressOrPair, SignerOptions, SubmittableExtrinsic } from '@polkadot/api/types';

import { getCachedApi } from '../../connection';
import createEventEmitter, { ICustomEventEmitter } from '../../utils/events';
import networkCallback from '../../utils/networkCallback';
import { EVENT_NAME_SINGLE } from './config';

/**
 * Save a single poe to the chain. You need to provide the data, the ID is calculated before saving.
 *
 * @NOTE calculating the ID inside allows us to decouple the ID generation from the rest of the code and potentially the calculation of the ID on the chain
 * @param d - Proof data that we want to save to the chain.
 * @param signer - Account that will be owner of the transaction and ones who pays the fees
 * @param options - Signer options
 * @returns the custom event emitter
 *
 * Example:
 * ```ts
 * import { pallets } from '@anagolay/api';
 * const broadcast = await pallets.poe.save(data, signer)
 *
 * broadcast.on(pallets.poe.config.EVENT_NAME_SINGLE, (p) => {
 *   console.log('[poe:save]', p.message)
 *   if (p.finalized) {
 *     process.exit(0)
 *   }
 * })
 * ```
 */
export async function save(
  d: AnProofData,
  signer: AddressOrPair,
  options: Partial<SignerOptions> = {}
): Promise<ICustomEventEmitter> {
  const broadcast = createEventEmitter();

  // @TODO if we need nonce in the future, this doesn't work
  // const nonce = await api.rpc.system.accountNextIndex(signer.address)
  await createSubmittableExtrinsic(d).signAndSend(signer, options, (params) =>
    networkCallback(params, broadcast, EVENT_NAME_SINGLE)
  );

  // return the event emitter
  return broadcast;
}

/**
 * Helper function for creating the Submittable result. This can be easily used in the `ramda.map` function with the list of SnProof. Returns the Submittable statement object
 *
 * ```ts
 * import { map } from 'ramda'
 * const txs = map(createSubmittableExtrinsic, d)
 *  ```
 *
 * @param d - Typescript native Proof
 *
 */
export function createSubmittableExtrinsic(d: AnProofData): SubmittableExtrinsic<'promise'> {
  const api = getCachedApi();

  return api.tx.poe.createProof(d);
}
