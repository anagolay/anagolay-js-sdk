/**
 * Anagolay JS
 * Copyright (C) 2022  Anagolay  Network
 * For Full license read LICENSE file
 */

// THIS UST BE INCLUDED IF WE WANT AUGMENTED TYPES
import '@anagolay/types/lib/interfaces/augment-api';
import '@anagolay/types/lib/interfaces/augment-types';

import { AnOperationData, AnOperationVersionData } from '@anagolay/types';
import customTypes from '@anagolay/types/lib/customTypes.json';
import { hexToString } from '@anagolay/utils';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { Keyring } from '@polkadot/keyring';
import { KeyringPair } from '@polkadot/keyring/types';
import { DispatchError } from '@polkadot/types/interfaces';
import { assert, isHex } from '@polkadot/util';
import { keyExtractSuri, mnemonicValidate } from '@polkadot/util-crypto';
import { KeypairType } from '@polkadot/util-crypto/types';
import { Spinner } from 'clui';
import { equals, isNil, trim } from 'ramda';
import signale, { Signale } from 'signale';

const SEED_LENGTHS: number[] = [12, 15, 18, 21, 24];

// if you want DEV UNITS you multiply them with this to get the REAL value for transfers
const COEFFICIENT_FOR_CONVERTING_TO_UNIT: number = 1000000000000;

/**
 * Connect to the API -- aka Anagolay Network -
 * @remarks
 * Default value for the connection is 'ws://127.0.0.1:9944', it can be overwritten by setting the `ANAGOLAY_CHAIN_WS_URL` environment variable
 * @param log { Signale } - Optional logging to stdout
 * @returns
 */
export async function connectToApi(log?: Signale): Promise<ApiPromise> {
  const whereToConnect = !isNil(process.env.ANAGOLAY_CHAIN_WS_URL)
    ? process.env.ANAGOLAY_CHAIN_WS_URL
    : 'ws://127.0.0.1:9944';

  const wsProvider = new WsProvider(whereToConnect);

  const api = await ApiPromise.create({
    provider: wsProvider,
    types: customTypes,
  });

  api.on('disconnected', () => log?.info('api disconnected'));
  api.on('connected', () => log?.info('api connected'));
  api.on('error', (error) => log?.info(`api error ${error}`));

  return api;
}
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
 * @param api
 * @param toAccount
 * @param fromAccount
 * @param amountInUnits
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

export interface ISignAndSubmitParams {
  api: ApiPromise;
  account: KeyringPair;
  operationData: AnOperationData;
  versionData: AnOperationVersionData;
}

export interface ISignSubmitErrorReturn {
  message: string;
  errorType: string;
}

export interface ISignSubmitSuccessReturn {
  blockHash: string;
  operationId: string;
}

/**
 * Take the seed and type then create the KeyringPair and return it
 * @param params
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
 * @param params
 * @remarks Error response is 
 * 
 * ```ts
 * export interface ISignSubmitErrorReturn {
 *   message: string;
 *   errorType: string;
 * }
```
 * 
 * @returns If success resolve will return `ISignSubmitSuccessReturn`, if there is an error reject will return `ISignSubmitErrorReturn`
 */
export async function signAndSubmit(params: ISignAndSubmitParams): Promise<ISignSubmitSuccessReturn> {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    // hold this until the end, clui doesn't like the signale
    let operationId: string;

    const spinner = new Spinner('');
    spinner.message('Signing and submitting the TX ...');

    spinner.start();

    const { versionData, operationData, api, account } = params;

    const submittable = api.tx.operations.create(operationData, versionData);

    const unSub = await submittable.signAndSend(account, {}, (result) => {
      // destruct the result
      const { events, status } = result;

      events.forEach((record) => {
        const { event } = record;

        if (equals(event.method, 'OperationCreated')) {
          operationId = hexToString(event.data[1].toString());
          spinner.message(`Operation created ID: ${operationId}`);
        }

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
              throw new Error(`Well, this is weird. The event value is not module nor token. 😟 `);
            }
          } else {
            // console.log('looped data', value.toJSON());
            // console.log('\n');
          }
        });
      });

      if (status.isInBlock) {
        spinner.message(``);
        spinner.message(`TX is in the block ...`);
      } else if (status.isFinalized) {
        const blockHash = status.asFinalized.toHex();

        spinner.message(`TX is finalized.`);
        spinner.stop();
        unSub();
        resolve({ blockHash, operationId });
      }
    });
  });
}

/**
 * Is a dispatch error or not
 *
 * @remarks Shamelessly taken from the https://github.com/polkadot-js/apps/blob/master/packages/react-params/src/Param/DispatchError.tsx#L25 because i couldn't find in their docs HOW to deal with the errors. now i know and it is weird
 * @param value
 * @returns
 */
function isDispatchError(value?: unknown): value is DispatchError {
  return !!(value && ((value as DispatchError).isModule || (value as DispatchError).isToken));
}
