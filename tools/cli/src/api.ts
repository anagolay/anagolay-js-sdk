/**
 * Anagolay JS
 * Copyright (C) 2022  Anagolay  Network
 * For Full license read LICENSE file
 */

// THIS MUST BE INCLUDED IF WE WANT AUGMENTED TYPES
import '@anagolay/types/augment-api';

import { ApiPromise, SubmittableResult } from '@polkadot/api';
import { Keyring } from '@polkadot/keyring';
import { KeyringPair } from '@polkadot/keyring/types';
import { DispatchError, EventRecord } from '@polkadot/types/interfaces';
import { assert, isHex } from '@polkadot/util';
import { keyExtractSuri, mnemonicValidate } from '@polkadot/util-crypto';
import { KeypairType } from '@polkadot/util-crypto/types';
import { Spinner } from 'clui';
import { trim } from 'ramda';
import signale from 'signale';

const SEED_LENGTHS: number[] = [12, 15, 18, 21, 24];

// if you want DEV UNITS you multiply them with this to get the REAL value for transfers
const COEFFICIENT_FOR_CONVERTING_TO_UNIT: number = 1000000000000;

/**
 * Get the Alice account
 */
export function getAlice(): KeyringPair {
  // Construct the keying after the API (crypto has an async init)
  const keyring = new Keyring({ type: 'sr25519' });

  // Add Alice to our keyring with a hard-derived path (empty phrase, so uses dev)
  const alice = keyring.addFromUri('//Alice');

  return alice;
}

/**
 * Seed here can be any of the following:
 *  - mnemonic (with/without derivation path): <mnemonic>[//<hard>/<soft>///<password>]
 *  - hex seed (with/without derivation path): <hex>[//<hard>/<soft>///<password>]
 */
function validateSeed(suri: string): void {
  const { phrase } = keyExtractSuri(suri);

  if (isHex(phrase)) {
    assert(isHex(phrase, 256), 'Hex seed needs to be 256-bits');
  } else {
    // sadly isHex detects as string, so we need a cast here
    assert(
      SEED_LENGTHS.includes(phrase.split(' ').length),
      `Mnemonic needs to contain ${SEED_LENGTHS.join(', ')} words`
    );
    assert(mnemonicValidate(phrase), 'Not a valid mnemonic seed');
  }
}
/**
 * Transfer the Tokens from one account to another.
 * @param api -
 * @param toAccount -
 * @param fromAccount -
 * @param amountInUnits -
 * @returns
 */
export async function transferToAccount(
  api: ApiPromise,
  toAccount: string,
  fromAccount: KeyringPair,
  amountInUnits: number = 1
): Promise<string> {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    const spinner = new Spinner('');
    spinner.message(`Not enough tokens, transferring ${amountInUnits} UNIT(s)`);
    spinner.start();
    // https://github.com/polkadot-js/api/issues/3281
    // const ed = api.consts.balances.existentialDeposit;
    // const realAmount = ed.addn(amountInUnits * 100000);
    // why??? well read the link above. in short that big number is one UNIT
    const realAmount = amountInUnits * COEFFICIENT_FOR_CONVERTING_TO_UNIT;

    try {
      const unSub = await api.tx.balances
        .transferKeepAlive(toAccount, realAmount)
        .signAndSend(fromAccount, (result) => {
          if (result.status.isFinalized) {
            spinner.stop();
            signale.success(`Token transfer done, blockHash is ${result.status.asFinalized.toHex()}`);
            unSub();
            resolve(result.status.asFinalized.toHex());
          }
        });
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}

export interface ISubmittable {
  signAndSend: (account: KeyringPair, callback: (result: SubmittableResult) => void) => Promise<() => void>;
}

export interface ISignSubmitErrorReturn {
  message: string;
  errorType: string;
}

export interface ISignSubmitSuccessReturn {
  blockHash: string;
  entityId: string;
}

/**
 * Take the seed and type then create the KeyringPair and return it
 * @param params - Input params
 * @returns
 */
export function createKeyringPairFromSeed(params: { seed: string; type: KeypairType }): KeyringPair {
  const { seed, type } = params;
  // validate the seed
  validateSeed(seed);

  const keyring = new Keyring({ type });
  return keyring.createFromUri(seed);
}

/**
 * Sign and send the extrinsic
 * @param account - Keyring pair used to sign
 * @param submittable - Extrinsic to sign and submit
 * @remarks Error response is 
 * ```ts
 * export interface ISignSubmitErrorReturn {
 *   message: string;
 *   errorType: string;
 * }
```
 * 
 * @returns If success resolve will return the block hash, if there is an error reject will return `ISignSubmitErrorReturn`
 */
export async function signAndSubmit(
  account: KeyringPair,
  submittable: ISubmittable,
  spinner: Spinner,
  eventsHandler?: (events: EventRecord[]) => void
): Promise<string> {
  spinner.message('Signing and submitting the TX ...');

  spinner.start();
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    const unSub = await submittable.signAndSend(account, (result) => {
      if (eventsHandler) {
        eventsHandler(result.events);
      }

      // destruct the result
      const { events, status } = result;
      events.forEach((record) => {
        const { event } = record;

        // if the event has more stuff, like the error
        event.data.map((value) => {
          if (isDispatchError(value)) {
            if (value.isModule) {
              const mod = value.asModule;
              const { docs, name, section } = mod.registry.findMetaError(mod);
              spinner.message(`Got error!`);
              spinner.stop();
              reject({
                message: trim(docs.join(', ')),
                errorType: `${section}.${name}`,
              });
              unSub();
            } else if (value.isToken) {
              spinner.message(`Got error!`);
              spinner.stop();
              reject({
                message: value.asToken.type,
                errorType: value.type,
              });
              unSub();
            } else {
              throw new Error(`Well, this is weird. The event value is not module nor token. 😟`);
            }
          } else {
            // console.log('looped data', value.toJSON());
            // console.log('\n');
          }
        });
      });

      if (status.isInBlock) {
        spinner.message(``);
        spinner.message(`TX is in the block ...           `);
      } else if (status.isFinalized) {
        const blockHash = status.asFinalized.toHex();

        spinner.message(`TX is finalized.`);
        spinner.stop();
        unSub();
        resolve(blockHash);
      }
    });
  });
}

/**
 * Is a dispatch error or not
 *
 * @remarks Shamelessly taken from the https://github.com/polkadot-js/apps/blob/master/packages/react-params/src/Param/DispatchError.tsx#L25 because i couldn't find in their docs HOW to deal with the errors. now i know and it is weird
 * @param value -
 * @returns
 */
function isDispatchError(value?: unknown): value is DispatchError {
  return !!(value && ((value as DispatchError).isModule || (value as DispatchError).isToken));
}
