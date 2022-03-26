/**
 * Anagolay JS
 * Copyright (C) 2022  Anagolay  Network
 * For Full license read LICENSE file
 */

/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */
import '@anagolay/types/lib/interfaces/augment-api';
import '@anagolay/types/lib/interfaces/augment-types';

import {
  AnBoolean,
  AnCharacters,
  AnForWhat,
  AnOperationArtifactStructure,
  AnOperationData,
  AnOperationVersionData,
  AnTypeName,
} from '@anagolay/types';
import { allCommitsPushed, createFileLogger, isFalse, isTrue, lastRevision, Logger } from '@anagolay/utils';
import { urlForRemote } from '@anagolay/utils';
import { ApiPromise } from '@polkadot/api';
import { KeyringPair } from '@polkadot/keyring/types';
import { hexToString } from '@polkadot/util';
import { KeypairType } from '@polkadot/util-crypto/types';
import axios, { AxiosResponse } from 'axios';
import clui from 'clui';
import { Command } from 'commander';
import inquirer from 'inquirer';
import { stat } from 'node:fs/promises';
import { Agent } from 'node:http';
import { equals, isEmpty, isNil } from 'ramda';
import signale from 'signale';

import {
  connectToApi,
  createKeyringPairFromSeed,
  getAlice,
  ISignSubmitErrorReturn,
  ISignSubmitSuccessReturn,
  signAndSubmit,
  transferToAccount,
} from '../../api';
import { askStarterQuestions } from '../../commonQuestions/common';
import { logsDir } from '../../utils';

// http Agent for the Axios
const httpAgent: Agent = new Agent({ keepAlive: true });

// eslint-disable-next-line @rushstack/typedef-var
const Spinner = clui.Spinner;

const log: Logger = createFileLogger(`${logsDir()}/operation.log`, { name: 'operation' });

export interface OperationVersionSchema {
  _id: string;
  repository: string;
  job_id: string;
  revision: string;
  artifacts: {
    performance: {
      execInSec: number;
    };
    items: AnOperationArtifactStructure[];
  };
  buildOutput: {
    performance: {
      execInSec: number;
    };
    outputResult: string;
  };
  manifest: string | any;
}

export interface SuccessfulResponse {
  done: boolean;
  version: OperationVersionSchema;
}

/**
 * Operation main Command
 *
 * Usage Example
 * ```bash
 * # run the subcommands
 * anagolay operation sub_command
 *
 * # or get help
 * anagolay help operation
 * ```
 *
 * @public
 */
export default async function makeCommand(): Promise<Command> {
  const operationCmd = new Command('operation');
  operationCmd.description('All operation related commands');

  operationCmd
    .command('publish')
    .description('Publish the Operation. You must run this in the Operation repository!')
    .action(publishSubcmd);

  return operationCmd;
}

/**
 *
 * Performs the sanity checks, calls the publish Service and stores teh data on the Anagolay chain.
 *
 * Usage Example
 * ```bash
 * anagolay operation publish
 * ```
 * @public
 */
async function publishSubcmd(): Promise<void> {
  await askStarterQuestions();

  const spinSanityCheck = new Spinner('Performing sanity checks ...');
  spinSanityCheck.start();

  // check the operation
  await areWeInTheOperationFolder();

  // do we have any commits that are not pushed?
  if (!(await allCommitsPushed(process.cwd()))) {
    signale.error('Please push all your commits before continuing.');
  }
  spinSanityCheck.stop();
  signale.success('Sanity checks, done!');

  let repository: string;
  try {
    repository = await urlForRemote();
  } catch (error) {
    signale.error(error);
    process.exit(1);
  }

  const responsePublishService = await callPublishOperationService(repository);

  const chain = await connectToAnagolayChain();

  const extrinsics = await submitTheExtrinsicCall(chain, responsePublishService);

  console.log('> Operation TX is at blockHash', extrinsics.blockHash);
  console.log('> Operation ID is', extrinsics.operationId);
  signale.success('Publishing is DONE 🎉🎉!');
  process.exit();
}

/**
 * Connect to the anagolay chain
 */
async function connectToAnagolayChain(): Promise<ApiPromise> {
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

interface IDecodedArtifactsWithManifest extends OperationVersionSchema {
  manifest: {
    name: AnCharacters;
    description: AnCharacters;
    repository: AnCharacters;
    nostd: AnBoolean;
    license: AnCharacters;
    inputs: AnTypeName[];
    config: Map<AnCharacters, AnCharacters[]>;
    groups: number[];
    output: AnTypeName;
  };
}

/**
 * Prepare and Create extrinsics, call the api and return the data
 * @param artifactsWithVersion
 * @public
 */
async function submitTheExtrinsicCall(
  chainApi: ApiPromise,
  artifactsWithVersion: IDecodedArtifactsWithManifest
): Promise<ISignSubmitSuccessReturn> {
  const { manifest, repository, artifacts: payloadArtifacts } = artifactsWithVersion;

  const operationData: AnOperationData = {
    name: manifest.name,
    description: manifest.description,
    inputs: manifest.inputs,
    config: manifest.config,
    repository: repository,
    license: manifest.license,
    output: manifest.output,
    groups: manifest.groups.map((g) => AnForWhat[g]) as unknown as number[],
    nostd: manifest.nostd,
  };

  const versionData: AnOperationVersionData = {
    /**
     * although this is required by the struct, it is NOT taken in the consideration while saving
     * the reason is that the `operation_id` is calculated on the chain, and cannot be created at this stage.
     * WE had a choice to make, keep it like this, OR create new types that exclude this property. Obviously we chose former.
     */
    entityId: '',
    parentId: '',
    artifacts: payloadArtifacts.items,
  };

  const { accountToUse } = await inquirer.prompt({
    name: 'accountToUse',
    message: 'How do you want to sign the TX',
    type: 'list',
    choices: [
      {
        key: 'alice',
        value: 'alice',
        name: 'With Alice',
      },
      {
        key: 'personal',
        value: 'personal',
        name: 'With my personal account',
      },
    ],
  });

  let accountFreeBalance = '0';

  // holder for the actual account
  let account: KeyringPair;

  // check the current account balance
  if (equals('alice', accountToUse)) {
    account = getAlice();
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
    } = (await chainApi.query.system.account(accountString)) as any; // typings didn't work that's why any

    // assign the initial balance
    accountFreeBalance = free.toString();
    if (accountFreeBalance === '0') {
      await transferToAccount(chainApi, accountString, getAlice(), 1);
    }
    account = createKeyringPairFromSeed({ seed, type: accountType });
  }

  try {
    return await signAndSubmit({
      api: chainApi,
      account,
      operationData,
      versionData,
    });
  } catch (error) {
    const { message, errorType } = error as ISignSubmitErrorReturn;
    signale.error(`${message} :: ${errorType}`);
    process.exit(1);
  }
}

/**
 * This calls the API and returns the correct payload.
 * @returns
 */
async function callPublishOperationService(repository: string): Promise<any> {
  const spinPublishOperation = new Spinner('');
  spinPublishOperation.message('Collecting information.');
  spinPublishOperation.start();
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const { apiKey, baseUrl } = await getApiInfo();
      const revision = await lastRevision(process.cwd());

      const payloadData = {
        context: 'operation',
        payload: {
          repository,
          revision,
        },
      };

      const publishServiceAddToQUrl: string = `${baseUrl}/v1/q`;

      const { data, status } = await axios.post(publishServiceAddToQUrl, payloadData, {
        headers: {
          'x-api-key': apiKey,
          'User-Agent': `Anagolay CLI v${7}`,
          'Content-Type': 'application/json',
        },
        httpAgent,
      });

      // Q job is created and we need to poll it
      if (status === 201) {
        spinPublishOperation.message('Checking is the remote job done. This can take a while.');
        const jobPollingInterval = setInterval(async () => {
          const response = await axios.get<any, AxiosResponse<SuccessfulResponse, any>>(
            [baseUrl, data.job.api].join(''),
            {
              headers: {
                'x-api-key': apiKey,
                'User-Agent': `Anagolay CLI v${7}`,
                'Content-Type': 'application/json',
              },
              httpAgent,
            }
          );

          const {
            data: { done: jobDone, version: responseData },
          } = response;

          if (jobDone) {
            clearInterval(jobPollingInterval);
            spinPublishOperation.stop();

            const resolveThis = {
              ...responseData,
              manifest: JSON.parse(hexToString(responseData.manifest)),
              buildOutput: {
                performance: responseData.buildOutput.performance,
                outputResult: hexToString(responseData.buildOutput.outputResult),
              },
            };
            resolve(resolveThis);
          }
        }, 2000);
      }
      // this means the operation is already published under this revision
      else if (status === 200) {
        spinPublishOperation.stop();
        const resolveThis = {
          ...data,
          manifest: JSON.parse(hexToString(data.manifest)),
          buildOutput: {
            performance: data.manifest.performance,
            outputResult: hexToString(data.manifest.outputResult),
          },
        };
        resolve(resolveThis);
      } else {
        const msg: string = `Unsupported status = ${status} for the Q request`;
        log.error(msg, data, status);
        throw new Error(msg);
      }
    } catch (error) {
      spinPublishOperation.stop();
      if (axios.isAxiosError(error)) {
        // log.error(error.response?.data);
        // signale.error(error.response?.data);
        // reject(error.response?.data);
        console.error(error.message);
        process.exit(1);
      } else {
        console.error('Not axios error', (error as Error).message);
        // log.error(error);
        // signale.error(error);
        reject((error as Error).message);
        process.exit(1);
      }
    }
  });
}

/**
 * Return the Publish service endpoint and the api key. If the api is not enabled it will be empty.
 *
 * The mocked api and has priority, so be careful with the settings
 * @returns
 */
async function getApiInfo(): Promise<{ apiKey: string; baseUrl: string }> {
  const {
    MOCK_API,
    POSTMAN_MOCK_API_KEY,
    ANAGOLAY_PUBLISH_SERVICE_API_KEY,
    ANAGOLAY_PUBLISH_SERVICE_API_URL,
    POSTMAN_MOCK_API_URL,
    ENABLE_API_KEY_SUPPORT,
  } = process.env;

  let apiKey: string = '';
  let baseUrl: string = '';

  if (
    !isNil(MOCK_API) &&
    isTrue(MOCK_API) &&
    !isNil(POSTMAN_MOCK_API_KEY) &&
    !isEmpty(POSTMAN_MOCK_API_KEY) &&
    !isNil(POSTMAN_MOCK_API_URL) &&
    !isEmpty(POSTMAN_MOCK_API_URL)
  ) {
    apiKey = POSTMAN_MOCK_API_KEY;
    baseUrl = POSTMAN_MOCK_API_URL;
    signale.info('Using mocked api');
    log.info('Using mocked api');
  } else {
    if (!isNil(ENABLE_API_KEY_SUPPORT) && isFalse(ENABLE_API_KEY_SUPPORT)) {
      if (
        !isNil(ANAGOLAY_PUBLISH_SERVICE_API_URL) &&
        !isEmpty(ANAGOLAY_PUBLISH_SERVICE_API_URL) &&
        !isNil(ANAGOLAY_PUBLISH_SERVICE_API_KEY) &&
        !isEmpty(ANAGOLAY_PUBLISH_SERVICE_API_KEY)
      ) {
        log.info('Found api key in the env variable, using that.');
        apiKey = ANAGOLAY_PUBLISH_SERVICE_API_KEY;
        baseUrl = ANAGOLAY_PUBLISH_SERVICE_API_URL;
      } else {
        throw new Error('Cannot find the api key and url in the env');
      }
    } else {
      if (!isNil(ANAGOLAY_PUBLISH_SERVICE_API_URL) && !isEmpty(ANAGOLAY_PUBLISH_SERVICE_API_URL)) {
        baseUrl = ANAGOLAY_PUBLISH_SERVICE_API_URL;
      }
    }
  }

  return {
    apiKey,
    baseUrl,
  };
}

/**
 * Check the existence of the correct files, and if they don't exist, fail, log error and exit with the status `1`.
 */
async function areWeInTheOperationFolder(): Promise<void> {
  try {
    // a list of files we need to have in order to determine that the folder contains the operation
    const mustHaveFiles = ['Cargo.toml', 'Makefile.toml'];

    // do the checks, throw the error if something is not ok
    await Promise.all(mustHaveFiles.map(async (m) => await stat(`${process.cwd()}/${m}`)));
  } catch (error) {
    log.error(error);
    signale.error(
      `You should run this command in the Operation root directory. You are running it in ${process.cwd()}`
    );
    process.exit(1);
  }
}
