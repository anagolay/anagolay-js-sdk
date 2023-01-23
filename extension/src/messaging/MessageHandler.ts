/* eslint-disable @typescript-eslint/no-explicit-any */
import '@anagolay/types/augment-api';

import { type ApiPromise, connectToWs, pallets } from '@anagolay/api';
import type {
  AnVerificationContext,
  AnVerificationRequest,
  AnVerificationStatus,
  TippingSettings
} from '@anagolay/types';
import Keyring from '@polkadot/keyring';
import type { Codec } from '@polkadot/types/types';
import { formatBalance } from '@polkadot/util';
import { mnemonicGenerate } from '@polkadot/util-crypto';
import { clone, equals, forEach, isNil, mergeDeepRight, values } from 'ramda';

import { defaultChainWs, EXTENSION_PREFIX, tokenName } from '$src/config';
import type {
  Address,
  MakeExtrinsicTip,
  MessageTypes,
  RequestAccountCreateSuri,
  RequestSeedCreate,
  RequestTippingEnabled,
  RequestTippingMakeTip,
  RequestTypes,
  ResponseFundsAvailable,
  ResponseSeedCreate,
  ResponseType
} from '$src/types';
import { makeLogNamespace, unitToSmallestUnits } from '$src/utils/utils';

import { createSubscription } from './subscriptions';

const SEED_DEFAULT_LENGTH = 12;

const lastError = (type: string): void => {
  const error = chrome.runtime.lastError;

  if (error) {
    console.error(`BaseStore.${type}:: runtime.lastError:`, error);
  }
};

export default class MessageHandler {
  #prefix: string;
  #loggerNs: string;
  /**
   * Anagolay Chain api connection instance
   */
  #api: ApiPromise;
  constructor() {
    this.#prefix = EXTENSION_PREFIX;
    this.#loggerNs = makeLogNamespace('messageHandler');
  }
  /**
   * Connect to the chain
   * @param chainWs
   */
  public async connectToChain(chainWs?: string): Promise<ApiPromise> {
    if (!isNil(this.#api)) {
      return this.#api;
    }

    const api = await connectToWs(chainWs);
    // wait then update
    await api.isReady;
    this.#api = api;
    await this.setConnectedChain(chainWs);
    console.debug(this.#loggerNs, 'connected to', chainWs);
    return api;
  }
  /**
   * Resolve the chain info then console.debug it if needed
   * @param toConsole - if `true` log to console do not return
   */
  public async chainApiInfo(toConsole = false): Promise<{
    chain: string;
    nodeName: string;
    nodeVersion: string;
    specName: string;
    specVersion: string;
  }> {
    const [chain, nodeName, nodeVersion]: [Codec, Codec, Codec] = await Promise.all([
      this.#api.rpc.system.chain(),
      this.#api.rpc.system.name(),
      this.#api.rpc.system.version()
    ]);

    return new Promise((resolve) => {
      this.#api.rpc.state.subscribeRuntimeVersion((r: any) => {
        const specName = r.specName.toString();
        const specVersion = r.specVersion.toString();

        const ret = {
          chain: chain.toString(),
          nodeName: nodeName.toString(),
          nodeVersion: nodeVersion.toString(),
          specName: specName.toString(),
          specVersion: specVersion.toString()
        };

        if (toConsole) {
          console.debug(
            this.#loggerNs,
            `You are connected to chain ${chain} using ${nodeName} v${nodeVersion}/${specVersion}`
          );
          console.debug(this.#loggerNs, ret);
        } else {
          resolve(ret);
        }
      });
    });
  }
  /**
   * Will append proper ns to the key
   * @returns key that we use to store stuff
   */
  private makeAccountsPrefix() {
    return `${this.#prefix}_accounts`;
  }
  /**
   * Chrome store setter
   * @param _key
   * @param value
   * @param update
   */
  private set(_key: string, value: Record<string, unknown> | string, update?: () => void): void {
    const key = `${this.#prefix}_${_key}`;

    chrome.storage.local.set({ [key]: value }, (): void => {
      lastError('set');

      update && update();
    });
  }

  /**
   * Update the chrome storage. Note that chrome storage doesn't natively support update, this method is using `get` then `set`
   * @param _key
   * @param value
   * @param _update
   */
  public update(_key: string, value: Record<string, unknown>, _update?: (value: any) => void): void {
    const key = `${this.#prefix}_${_key}`;

    // get the key
    chrome.storage.local.get([key], (result): void => {
      lastError('updateGet');
      const currentValue = result[key];
      const updatedResult = mergeDeepRight(currentValue, value);
      chrome.storage.local.set({ [key]: updatedResult }, (): void => {
        lastError('updateSet');

        _update && _update(result[key]);
      });
    });
  }
  /**
   * Getter for the chrome storage
   * @param _key - indexed key
   * @param update - callback for getting the value
   */
  private get<T>(_key: string, update: (value: T) => void): void {
    const key = `${this.#prefix}_${_key}`;

    chrome.storage.local.get([key], (result): void => {
      lastError('get');

      update(result[key]);
    });
  }

  private remove(_key: string, update?: () => void): void {
    const key = `${this.#prefix}_${_key}`;

    chrome.storage.local.remove(key, (): void => {
      lastError('remove');

      update && update();
    });
  }
  /**
   * Delete single account based on the address
   * @param address
   * @returns
   */
  public async accountDelete(address: string): Promise<boolean> {
    return new Promise((resolve) => {
      const key = this.makeAccountsPrefix();
      chrome.storage.local.get(key).then((oldState) => {
        // need to pass the key to get the actual values
        const newState = clone(oldState[key]);
        delete newState[address];
        this.updateAccounts(newState).then(() => resolve(true));
      });
    });
  }

  private async accountsCreateSuri(data: RequestAccountCreateSuri): Promise<boolean> {
    const oldState = (await this.accountsGet([], true)) as Record<Address, RequestAccountCreateSuri>;
    const newState = mergeDeepRight(oldState, { [data.address]: data });

    await this.updateAccounts(newState);

    return true;
  }

  /**
   * Update accounts storage. You must pass new state which you want to store. It will not assume any merging or manipulation.
   *
   * @param newState - An object as a key-value where the `key` is account address and
   * @returns
   */
  private async updateAccounts(
    newState: Record<Address, RequestAccountCreateSuri>
  ): Promise<RequestAccountCreateSuri[]> {
    this.set('accounts', newState);

    return values(newState);
  }

  private async accountUpdateSingle(data: Partial<RequestAccountCreateSuri>): Promise<boolean> {
    const oldState = (await this.accountsGet()) as RequestAccountCreateSuri[];

    const newState: Record<Address, RequestAccountCreateSuri> = {};

    forEach((i) => {
      if (equals(i.address, data.address)) {
        newState[i.address] = mergeDeepRight(i, data);
      } else {
        newState[i.address] = i;
      }
    }, oldState);

    await this.updateAccounts(newState);

    return true;
  }

  /**
   * Retrieve single or multiple accounts
   * @param data - list single or multiple account public addresses, default is `[]`
   * @param asInStorage - resolves the data structure as it is stored.
   * @returns
   */
  private async accountsGet(
    data: Address[] = [],
    asInStorage: boolean = false
  ): Promise<RequestAccountCreateSuri[] | Record<Address, RequestAccountCreateSuri>> {
    return new Promise((resolve) =>
      this.get('accounts', (accounts: Record<Address, RequestAccountCreateSuri>) => {
        if (isNil(accounts)) {
          if (asInStorage) {
            resolve({});
          } else {
            resolve([]);
          }
        } else if (equals(data, [])) {
          if (asInStorage) {
            resolve(accounts);
          } else {
            resolve(values(accounts));
          }
        } else {
          if (asInStorage) {
            const filtered = {};
            data.forEach((d) => (filtered[d] = accounts[d]));
            resolve(filtered);
          } else {
            const filtered = data.map((d) => accounts[d]);
            resolve(filtered);
          }
        }
      })
    );
  }
  /**
   *
   * @param param0
   * @returns
   */
  private seedCreate({
    length = SEED_DEFAULT_LENGTH,
    seed: _seed,
    type
  }: RequestSeedCreate): ResponseSeedCreate {
    const seed = _seed || mnemonicGenerate(length);
    const keyring = new Keyring({ type });

    return {
      address: keyring.createFromUri(seed, {}, type).address,
      seed
    };
  }
  /**
   *
   * @param data
   * @returns
   */
  private setAccountSelected(data: Address): boolean {
    this.set('selectedAccount', data);
    return true;
  }
  /**
   * Get selected account
   * @returns
   */
  private async getAccountSelected(): Promise<RequestAccountCreateSuri> {
    return new Promise<RequestAccountCreateSuri>((resolve) =>
      this.get<Address>('selectedAccount', async (s) => {
        const account = await this.accountsGet([s]);
        resolve(account[0]);
      })
    );
  }

  private async verificationGetRequest(data: AnVerificationContext[]): Promise<AnVerificationRequest[]> {
    const status: AnVerificationStatus = {
      Success: null
    };

    const req: Codec = await this.#api.rpc.verification.getRequests(data, status, 0, data.length);
    return req.toHuman() as unknown as AnVerificationRequest[];
  }

  /**
   * Use this method to know is the tipping enabled or not
   * @param data - Context and the holder, {@link RequestTippingEnabled}
   * @returns
   */
  private async tippingEnabledForContext(data: RequestTippingEnabled): Promise<boolean> {
    const { address, context } = data;

    const req = (await this.#api.query.tipping.tippingSettingsByAccountIdAndVerificationContext(
      address,
      context
    )) as TippingSettings; // no idea why the augmentation doesn't work
    const readableReq = req.enabled;

    return readableReq.toHuman();
  }

  private async getFundsForAccount(address: Address): Promise<ResponseFundsAvailable> {
    return new Promise((resolve) => {
      this.#api.query.system.account(address, ({ data: balance }) => {
        const freeBalance = formatBalance(balance.free, {
          decimals: 12,
          withSi: true,
          withUnit: tokenName
        });
        resolve({
          formatted: freeBalance,
          asString: balance.free.toString()
        });
      });
    });
  }

  /**
   * Get the fee for the `verification.tip` extrinsic
   * @param data
   * @returns
   */
  private async tippingTipPaymentInfo(data: RequestTippingMakeTip): Promise<string> {
    const { amount, context, sender: address } = data;

    // you don't want to send the KeyringPair over from the app. REMEMBER THE SERIALIZATION that CHROME DOES
    const keyring: Keyring = new Keyring({ ss58Format: 42, type: 'sr25519' });
    const sender = keyring.addFromAddress(address);

    const realCtx = this.#api.createType('VerificationVerificationContext', context);

    const info = await this.#api.tx.tipping.tip(amount, realCtx).paymentInfo(sender);
    const feeToPay = info.partialFee.toString();
    return feeToPay;
  }

  /**
   * Use REAL WORLD values of token for sending, it will be transformed to the chain decimals
   * @param data -
   * @param id -
   * @param port -
   * @returns
   */
  private async sendTip(data: MakeExtrinsicTip, id: string, port: chrome.runtime.Port): Promise<void> {
    const {
      params: { amount: _amount, context },
      sender: account
    } = data;
    const cb = createSubscription<'pri(chain.tx.tipping.tip)'>(id, port);

    const amount = unitToSmallestUnits(_amount as string);

    const [{ seed, password }] = (await this.accountsGet([account])) as RequestAccountCreateSuri[];

    const keyring: Keyring = new Keyring({ ss58Format: 42, type: 'sr25519' });

    const sender = keyring.addFromUri(seed);
    if (sender.isLocked) {
      sender.decodePkcs8(password);
    }

    const b = await pallets.tipping.tip(
      {
        amount,
        context
      },
      sender
    );
    // this is triggered multiple times, handle it in frontend
    b.on('error', (error) => {
      cb({
        error: error.error.message
      });
    });

    b.once('TipCreated', (r) => {
      cb({
        data: r.data
      });
    });
    b.once('finalized', (e: any) => {
      // console.log('sw-finalized', e);
      cb({
        finalized: true,
        data: e.data as any
      });
    });
  }

  private async setConnectedChain(chainWs: string) {
    const key = `${this.#prefix}_connectedTo`;
    this.set(key, chainWs);
  }

  private async getConnectedChain(): Promise<string> {
    return new Promise((resolve) => {
      const key = `${this.#prefix}_connectedTo`;
      this.get(key, resolve);
    });
  }

  /**
   * handle the request, everything starts from here in this class
   */
  public async handle<TMessageType extends MessageTypes>(
    id: string,
    type: TMessageType,
    request: RequestTypes[TMessageType],
    port?: chrome.runtime.Port
  ): Promise<ResponseType<TMessageType>> {
    // connect to the chain
    await this.connectToChain(defaultChainWs);

    switch (type) {
      case 'pri(accounts.create.suri)':
        return await this.accountsCreateSuri(request as RequestAccountCreateSuri);
      case 'pri(accounts.update.single)':
        return await this.accountUpdateSingle(request as RequestAccountCreateSuri);
      case 'pri(accounts.update)':
        return await this.updateAccounts(request as Record<Address, RequestAccountCreateSuri>);
      case 'pri(accounts.get)':
        return await this.accountsGet(request as Address[]);
      case 'pri(accounts.delete)':
        return this.accountDelete(request as Address);
      case 'pri(accounts.setAccountSelected)':
        return this.setAccountSelected(request as Address);
      case 'pri(accounts.getAccountSelected)':
        return await this.getAccountSelected();
      case 'pri(seed.create)':
        return this.seedCreate(request as RequestSeedCreate);
      case 'pri(chain.verification.getRequest)':
        return this.verificationGetRequest(request as AnVerificationContext[]);

      case 'pri(chain.tipping.enabledForContext)':
        return this.tippingEnabledForContext(request as RequestTippingEnabled);
      case 'pri(chain.tipping.tip.paymentInfo)':
        return await this.tippingTipPaymentInfo(request as RequestTippingMakeTip);
      case 'pri(chain.tx.tipping.tip)':
        return await this.sendTip(request as MakeExtrinsicTip, id, port);

      case 'pri(accounts.getFundsForAccount)':
        return await this.getFundsForAccount(request as Address);

      case 'pri(config.setConnectedChain)':
        return await this.setConnectedChain(request as string);
      case 'pri(config.getConnectedChain)':
        return await this.getConnectedChain();

      default:
        throw new Error(`Unable to handle message of type ${type}`);
    }
  }
}
