/* eslint-disable @typescript-eslint/no-explicit-any */
import '@anagolay/types/augment-api';

import { AnTippingSettings, AnVerificationContext } from '@anagolay/types';
import { AddressOrPair, SignerOptions } from '@polkadot/api/types';
import { TippingEvent } from '@polkadot/types/lookup';
import { AnyNumber } from '@polkadot/types/types';

import { getCachedApi } from '../../connection';
import createEventEmitter, { ICustomEventEmitter } from '../../utils/customEvents';
import { networkCallback } from '../../utils/networkCallback';

/**
 * @public
 */
export interface ITipExtrinsic {
  /**
   * Use the real world number here, it will be transformed to chain decimals
   */
  amount: AnyNumber;
  context: AnVerificationContext;
}

/**
 * Make a tip
 * @param params -
 * @param signer -
 * @param options -
 * @returns
 */
export async function tip(
  params: ITipExtrinsic,
  signer: AddressOrPair,
  options: Partial<SignerOptions> = {}
): Promise<ICustomEventEmitter<TippingEvent>> {
  const broadcast = createEventEmitter<TippingEvent>();
  const api = getCachedApi();
  const { amount, context } = params;

  const realCtx = api.createType('VerificationVerificationContext', context);

  api.tx.tipping
    .tip(amount, realCtx)
    .signAndSend(signer, options, (params) => networkCallback(params, broadcast));

  return broadcast;
}
/**
 * Update the settings
 * @param params -
 * @param signer -
 * @param options -
 * @returns
 */
export async function updateSettings(
  params: AnTippingSettings,
  signer: AddressOrPair,
  options: Partial<SignerOptions> = {}
): Promise<ICustomEventEmitter<TippingEvent>> {
  const broadcast = createEventEmitter<TippingEvent>();
  const api = getCachedApi();
  const { account, context, enabled } = params;

  const realCtx = api.createType('VerificationVerificationContext', context);

  api.tx.tipping
    .updateSettings([
      {
        context: realCtx,
        enabled,
        account
      }
    ])
    .signAndSend(signer, options, (params) => networkCallback(params, broadcast));

  return broadcast;
}
