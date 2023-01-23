/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnVerificationAction, AnVerificationContext, AnVerificationRequest } from '@anagolay/types';
import { AddressOrPair, SignerOptions } from '@polkadot/api/types';
import { AccountId32 } from '@polkadot/types/interfaces';
import { equals } from 'ramda';

import { getCachedApi } from '../../connection';
import { ICustomEventEmitter, networkCallback } from '../../utils';
import createEventEmitter from '../../utils/customEvents';

/**
 *
 * @param params -
 * @param signer -
 * @param options -
 * @returns
 */
export async function requestVerificationAndSend(
  params: {
    context: AnVerificationContext;
    action: AnVerificationAction;
  },
  signer: AddressOrPair,
  options: Partial<SignerOptions> = {}
): Promise<ICustomEventEmitter<[AccountId32, AnVerificationRequest]>> {
  const broadcast = createEventEmitter<[AccountId32, AnVerificationRequest]>();
  const api = getCachedApi();

  const realCtx = api.createType('VerificationVerificationContext', params.context);
  const realAction = api.createType('VerificationVerificationAction', params.action);

  api.tx.verification
    .requestVerification(realCtx, realAction)
    .signAndSend(signer, options, (params) => networkCallback(params, broadcast));

  return broadcast;
}

/**
 * Verification Extrinsic `performVerification`
 * @param context - {@link AnVerificationRequest}
 * @param signer - {@link AddressOrPair}
 * @param options - Partial<{@link SignerOptions}>
 * @returns EventEmitter {@link ICustomEventEmitter}
 */
export async function performVerificationAndSend(
  context: AnVerificationRequest,
  signer: AddressOrPair,
  options: Partial<SignerOptions> = {}
): Promise<ICustomEventEmitter<[AccountId32, AnVerificationRequest]>> {
  const broadcast = createEventEmitter<[AccountId32, AnVerificationRequest]>();
  const api = getCachedApi();

  const realCtx = api.createType('VerificationVerificationRequest', context);

  api.tx.verification
    .performVerification(realCtx)
    .signAndSend(signer, options, (params) => networkCallback(params, broadcast));

  return broadcast;
}

/**
 * Listen to pallets events
 * @param eventName - one of the
 * @returns EventEmitter  {@link ICustomEventEmitter} that returns {@link AnVerificationRequest}
 */
export function listenForEvent(
  eventName: 'VerificationRequested' | 'VerificationSuccessful' | 'VerificationFailed'
): ICustomEventEmitter<AnVerificationRequest> {
  const broadcast = createEventEmitter<AnVerificationRequest>();
  const api = getCachedApi();
  api.query.system.events((r: any) => {
    r.forEach(({ event }: any) => {
      const { data, method } = event;
      if (equals(method, eventName)) {
        broadcast.emit(eventName, { data: data[1].toHuman() as unknown as AnVerificationRequest });
      }
    });
  });
  return broadcast;
}
