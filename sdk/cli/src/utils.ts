/**
 * Anagolay JS
 * Copyright (C) 2022  Anagolay  Network
 * For Full license read LICENSE file
 */

import { ApiPromise } from '@polkadot/api';
import { KeyringPair } from '@polkadot/keyring/types';
import { AccountInfo } from '@polkadot/types/interfaces';
import { KeypairType } from '@polkadot/util-crypto/types';
import { Spinner } from 'clui';
import inquirer from 'inquirer';
import { mkdirSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { resolve } from 'node:path';
import { equals, isEmpty } from 'ramda';
import signale from 'signale';

import { connectToApi, createKeyringPairFromSeed, getAlice, transferToAccount } from './api';

/**
 * Make the logs directory into the `os.homedir()/.logs/anagolay`
 * @returns the logs directory when created
 *
 * @remarks This should stay sync because we are using it in the top level
 *
 * @public
 */
export function logsDir(): string {
  const logsDir: string = `${homedir()}/.logs/anagolay`;
  mkdirSync(logsDir, { recursive: true });

  return logsDir;
}

/**
 * Settings interface
 * @remarks This should maybe be typed differently. Probably use Pick or Partial
 */
interface ISettings {
  /**
   * FirstTimeSetup
   */
  fts: boolean;
  enableTelemetry: boolean;
  disableStartupQuestions: boolean;
}

/**
 * Create the `settings.json`file which acts as the settings  file
 *
 * The file is created in `os.homedir()/.cache/anagolay` directory
 * @param data - Settings for the CLI, usually about the Telemetry, first-time-setup etc ...
 * @public
 */
export async function createSettingsFile(data: ISettings): Promise<void> {
  const cacheDir: string = resolve(homedir(), '.cache/anagolay');
  await mkdir(cacheDir, { recursive: true });
  await writeFile(resolve(cacheDir, 'settings.json'), JSON.stringify(data, null, 2));
}

/**
 * Update the `settings.json` by merging the existing values and input values
 * @param data - Settings data to change
 *
 */
export async function updateSettingsFile(data: ISettings): Promise<void> {
  const settings: ISettings = await readSettingsFile();
  const settingsFilePath: string = resolve(homedir(), '.cache/anagolay', 'settings.json');
  await writeFile(settingsFilePath, JSON.stringify({ ...settings, ...data }, null, 2));
}

/**
 * Read the `os.homedir()/.cache/anagolay/settings.json` file
 * @returns `JSON.parse`d output
 * @public
 */
export async function readSettingsFile(): Promise<ISettings> {
  try {
    const settingsFilePath: string = resolve(homedir(), '.cache/anagolay', 'settings.json');
    return JSON.parse((await readFile(settingsFilePath)).toString());
  } catch (e) {
    return {
      fts: false,
      enableTelemetry: true,
      disableStartupQuestions: false,
    };
  }
}

/**
 * @returns Return the `enableTelemetry` setting
 */
export async function isTelemetryEnabled(): Promise<boolean> {
  const { enableTelemetry } = await readSettingsFile();
  return enableTelemetry;
}

/**
 * Connect to the anagolay chain
 */
export async function connectToAnagolayChain(): Promise<ApiPromise> {
  const spinner = new Spinner('');
  spinner.message('Connecting to the Anagolay chain ...');
  spinner.start();

  const api = await connectToApi();
  // Retrieve the chain & node information information via rpc calls
  const [nodeName, nodeVersion] = await Promise.all([api.rpc.system.name(), api.rpc.system.version()]);

  spinner.message('Connected!');
  spinner.stop();
  signale.info(`Connected to ${nodeName} v${nodeVersion}`);

  return api;
}

/**
 * Ensure that the selected account has enough balance.
 * In this temporary feature used to demo either Alice is used or the funds are transfered from Alice if they are missing
 * @param chainApi - The polkadot ApiPromise
 * @param accountToUse - name of the account to use
 *
 * @returns KeyringPair - The keyring pair used to sign a transaction
 */
export async function ensureBalance(chainApi: ApiPromise, accountToUse: string): Promise<KeyringPair> {
  let accountFreeBalance = '0';

  // check the current account balance
  if (equals('alice', accountToUse)) {
    return getAlice();
  }
  // else if (equals('personal', accountToUse)) {
  else {
    const {
      accountString,
      accountType,
      seed,
    }: { accountString: string; accountType: KeypairType; seed: string } = await inquirer.prompt([
      {
        name: 'accountString',
        message: 'Account',
        type: 'input',
        validate: (input) => {
          return isEmpty(input) ? 'Account cannot be empty' : true;
        },
      },
      {
        name: 'accountType',
        message: 'Account type',
        type: 'list',
        choices: ['sr25519', 'ed25519'],
        default: 'sr25519',
      },
      {
        name: 'seed',
        message: 'Mnemonic Seed',
        type: 'password',
        validate: (input) => {
          return isEmpty(input) ? 'Seed cannot be empty' : true;
        },
      },
    ]);

    const {
      data: { free },
    } = await chainApi.query.system.account<AccountInfo>(accountString);

    // assign the initial balance
    accountFreeBalance = free.toString();
    if (accountFreeBalance === '0') {
      await transferToAccount(chainApi, accountString, getAlice(), 1);
    }
    return createKeyringPairFromSeed({ seed, type: accountType });
  }
}
